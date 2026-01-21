import { createTransport } from 'nodemailer/lib/nodemailer.js';
import { template } from "./template.js";
import 'dotenv/config'

if(!process.env.EM_ID || !process.env.EM_PW || !process.env.TO_EMAIL) {
  throw new Error("Please set EM_ID, EM_PW, and TO_EMAIL environment variables.");
}

/**
 * Send a manual notification email
 * @param {string} title - The notification title
 * @param {string} attachmentUrl - Optional PDF/attachment URL
 * @param {string} siteUrl - The source site URL
 * @param {string} siteName - The name of the site
 */
async function sendNotification(title, attachmentUrl = null, siteUrl = '', siteName = 'Test Site') {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EM_ID,
      pass: process.env.EM_PW
    }
  });

  const mailOptions = {
    from: 'Notify',
    to: process.env.TO_EMAIL,
    subject: `New Update from ${siteName}!`,
    text: `A new update is available for the site: ${siteUrl}\n ${title}`,
    html: template(title, attachmentUrl, siteUrl, siteName)
  };

  console.log('Sending notification...');
  console.log(`To: ${mailOptions.to}`);
  console.log(`Subject: ${mailOptions.subject}`);
  console.log(`Title: ${title}`);
  console.log(`Attachment: ${attachmentUrl || 'None'}`);
  console.log();

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✓ Email sent successfully!');
    console.log(`Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('✗ Failed to send email:', error.message);
    throw error;
  }
}

// Command line interface
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node send-notification.js [options]

Options:
  --title <string>      Notification title (required)
  --attachment <url>    PDF/attachment URL (optional)
  --site-url <url>      Source site URL (optional)
  --site-name <string>  Site name (default: "Test Site")
  --help, -h            Show this help message

Examples:
  # Simple notification
  node send-notification.js --title "B.Tech 2020 Scheme Results Published"

  # With attachment
  node send-notification.js --title "Exam Schedule" --attachment "https://example.com/schedule.pdf"

  # Full details
  node send-notification.js \\
    --title "B.Tech 2024 Scheme - Examination Notification" \\
    --attachment "https://exams.keralauniversity.ac.in/notices/exam.pdf" \\
    --site-url "https://exams.keralauniversity.ac.in" \\
    --site-name "Kerala University Examinations"
  `);
  process.exit(0);
}

// Parse command line arguments
let title = "SECOND SEMESTER B.TECH DEGREE EXAMINATION, JUNE 2025";
let attachmentUrl = "https://exams.keralauniversity.ac.in/Images/Result/2026/01/33851.pdf";
let siteUrl = 'https://exams.keralauniversity.ac.in/Login/check8';
let siteName = 'University of Kerala - Results';

if (!title) {
  console.error('Error: --title is required\n');
  console.log('Use --help for usage information');
  process.exit(1);
}

// Send the notification
sendNotification(title, attachmentUrl, siteUrl, siteName)
  .then(() => {
    console.log('\n✓ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Failed:', error.message);
    process.exit(1);
  });

// Export for use in other files
export { sendNotification };
