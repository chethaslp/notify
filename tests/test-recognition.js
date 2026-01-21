import { parse } from 'node-html-parser';
import { readPdfText } from 'pdf-text-reader';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load sample HTML from file
const sampleHTML = readFileSync(join(__dirname, 'sample-page.html'), 'utf-8');

/**
 * Extract the recognition logic from cron.js for testing
 * @param {Object} element - HTML element to check
 * @param {boolean} skipPdfCheck - Skip PDF content checking (for testing without actual PDFs)
 * @returns {Promise<Object>} - Result with pass/fail and reason
 */
async function testRecognitionLogic(element, skipPdfCheck = true) {
  const result = {
    title: '',
    link: '',
    passed: false,
    reason: '',
    needsPdfCheck: false
  };

  try {
    const title = element.querySelector('td:nth-child(2)')?.textContent.trim() || '';
    const att = element.querySelector('a')?.getAttribute('href') || '';
    
    result.title = title;
    result.link = att;

    // Normalize the title
    const normalizedString = title.toLowerCase()
      .replace(/[\n\r]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Check if title contains B.Tech/BTech
    if (!/b\.?tech/.test(normalizedString)) {
      result.reason = 'Not a B.Tech notice';
      return result;
    }

    // Check if title contains 2020 or 2024 scheme
    if (/2020 scheme/.test(normalizedString) || /2024 scheme/.test(normalizedString)) {
      result.passed = true;
      result.reason = 'Title contains B.Tech and valid scheme (2020 or 2024)';
      return result;
    }

    // Title has B.Tech but no valid scheme mentioned
    result.needsPdfCheck = true;
    
    if (skipPdfCheck) {
      result.reason = 'B.Tech found but needs PDF check for scheme verification';
      result.passed = false; // Set to false in test mode, would check PDF in real scenario
      return result;
    }

    // In production, check PDF content
    console.log('Checking PDF attachment: ' + att);
    try {
      const pdfText = await readPdfText({ url: att });
      const pdfLower = pdfText.toLowerCase();
      
      if (((/2020 scheme/.test(pdfLower) || /2024 scheme/.test(pdfLower)) && /b\.?tech/.test(pdfLower))) {
        result.passed = true;
        result.reason = 'PDF contains B.Tech and valid scheme (2020 or 2024)';
      } else {
        result.reason = 'PDF does not contain valid scheme or B.Tech';
      }
    } catch (pdfError) {
      result.reason = 'Failed to read PDF: ' + pdfError.message;
    }

    return result;
  } catch (error) {
    result.reason = 'Error processing element: ' + error.message;
    return result;
  }
}

/**
 * Run tests on the sample HTML
 * @param {string} htmlFilePath - Optional path to HTML file to test (defaults to sample-page.html)
 * @param {boolean} checkPdfs - Whether to actually check PDF content (default: false)
 */
async function runTests(htmlFilePath = null, checkPdfs = false) {
  console.log('='.repeat(80));
  console.log('TESTING RECOGNITION LOGIC');
  console.log('='.repeat(80));
  
  const htmlContent = htmlFilePath 
    ? readFileSync(htmlFilePath, 'utf-8')
    : sampleHTML;
  
  console.log(`Source: ${htmlFilePath || 'sample-page.html'}`);
  console.log(`PDF Checking: ${checkPdfs ? 'ENABLED' : 'DISABLED (use --check-pdfs to enable)'}`);
  console.log();

  const parsed = parse(htmlContent);
  const elements = parsed.querySelectorAll('tr.displayList');

  console.log(`Found ${elements.length} notices to test\n`);

  const results = {
    passed: [],
    failed: [],
    needsPdfCheck: [],
    pdfCheckPassed: [],
    pdfCheckFailed: []
  };

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const testResult = await testRecognitionLogic(element, !checkPdfs);

    console.log(`\n[Test ${i + 1}/${elements.length}]`);
    console.log('-'.repeat(80));
    console.log(`Title: ${testResult.title}`);
    console.log(`Link: ${testResult.link}`);
    console.log(`Status: ${testResult.passed ? '✓ PASSED' : '✗ FAILED'}`);
    console.log(`Reason: ${testResult.reason}`);
    
    if (testResult.needsPdfCheck) {
      console.log(`⚠️  PDF Check Required: YES`);
      results.needsPdfCheck.push(testResult);
      
      // Track PDF check results separately
      if (checkPdfs) {
        if (testResult.passed) {
          results.pdfCheckPassed.push(testResult);
        } else {
          results.pdfCheckFailed.push(testResult);
        }
      }
    }

    if (testResult.passed) {
      results.passed.push(testResult);
    } else {
      results.failed.push(testResult);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Tests: ${elements.length}`);
  console.log(`✓ Passed (Would send notification): ${results.passed.length}`);
  console.log(`✗ Failed (Would be filtered out): ${results.failed.length}`);
  
  if (checkPdfs) {
    console.log(`⚠️  Required PDF Check: ${results.needsPdfCheck.length}`);
    console.log(`   ✓ PDF Check Passed: ${results.pdfCheckPassed.length}`);
    console.log(`   ✗ PDF Check Failed: ${results.pdfCheckFailed.length}`);
  } else {
    console.log(`⚠️  Needs PDF Check: ${results.needsPdfCheck.length} (skipped in this run)`);
  }
  console.log();

  if (results.passed.length > 0) {
    console.log('\n📧 WOULD SEND NOTIFICATIONS FOR:');
    console.log('-'.repeat(80));
    results.passed.forEach((r, i) => {
      console.log(`${i + 1}. ${r.title}`);
      if (checkPdfs && r.needsPdfCheck) {
        console.log(`   └─ Passed via PDF check`);
      }
    });
  }

  if (!checkPdfs && results.needsPdfCheck.length > 0) {
    console.log('\n📄 WOULD CHECK PDF FOR (not checked in this run):');
    console.log('-'.repeat(80));
    results.needsPdfCheck.forEach((r, i) => {
      console.log(`${i + 1}. ${r.title}`);
      console.log(`   Link: ${r.link}`);
    });
    console.log('\n💡 Tip: Run with --check-pdfs flag to actually check PDF content');
  }

  if (checkPdfs && results.pdfCheckFailed.length > 0) {
    console.log('\n❌ PDF CHECK FAILED FOR:');
    console.log('-'.repeat(80));
    results.pdfCheckFailed.forEach((r, i) => {
      console.log(`${i + 1}. ${r.title}`);
      console.log(`   Link: ${r.link}`);
      console.log(`   Reason: ${r.reason}`);
    });
  }

  if (results.failed.length > 0 && (!checkPdfs || results.failed.some(r => !r.needsPdfCheck))) {
    console.log('\n🚫 WOULD FILTER OUT:');
    console.log('-'.repeat(80));
    results.failed.filter(r => !checkPdfs || !r.needsPdfCheck).forEach((r, i) => {
      console.log(`${i + 1}. ${r.title} - ${r.reason}`);
    });
  }
}

// Run the tests
// Usage:
//   node test-recognition.js                          - Test with sample-page.html
//   node test-recognition.js path/to/file.html        - Test with custom HTML file
//   node test-recognition.js --check-pdfs             - Test sample with PDF checking
//   node test-recognition.js path/to/file.html --check-pdfs  - Test custom file with PDF checking
const args = process.argv.slice(2);
const checkPdfs = args.includes('--check-pdfs') || args.includes('--check-pdf');
const customHtmlPath = args.find(arg => !arg.startsWith('--') && arg !== 'node' && !arg.endsWith('.js'));

runTests(customHtmlPath, checkPdfs).catch(console.error);

// Export for use in other test files
export { testRecognitionLogic, runTests };
