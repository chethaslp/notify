import { createTransport }  from 'nodemailer/lib/nodemailer.js';
import axios from "axios";
import { createClient } from '@supabase/supabase-js';
import { template } from "./template.js";
import { parse } from 'node-html-parser';
import 'dotenv/config'

if(!process.env.SUPABASE_URL) throw new Error("Please set env vars to continue.");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function cron() {

  var tr = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EM_ID, 
      pass: process.env.EM_PW
    }
  });

  const sites = await supabase.from('sites').select('*');

  if(sites.data.length ==0){
    console.log("No sites added.")
    return;
  }else console.log(`Checking ${sites.data.length} sites.`)

  sites.data.forEach(async site => {

    const latestSiteData = await axios.get(site.url);

    if(!site.data) {
      await supabase.from('sites').update({data: latestSiteData.data, last_checked: new Date()}).match({url: site.url});
      console.log("Initial data added for: " + site.url);
    }else {
      const latestParsed = parse(latestSiteData.data);
      const cacheParsed = parse(site.data);
      const res = [];
      let itt = false;

      latestParsed.querySelectorAll('tr.displayList').forEach(e => {
        itt = false;
        cacheParsed.querySelectorAll('tr.displayList').forEach(c => {
          e.querySelector('td:nth-child(2)').textContent.trim() == c.querySelector('td:nth-child(2)').textContent.trim() ? itt =true : null;
        })
        if(!itt) res.push(e);
    });

      if(res.length > 0) {
        await supabase.from('sites').update({data: latestSiteData.data, last_checked: new Date()}).match({url: site.url});

        res.forEach(ch => {
          let title = ch.querySelector('td:nth-child(2)').textContent.trim();
          
          const normalizedString = title.toLowerCase()
            .replace(/[\n\r]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          if(!(/university college of engineering/.test(normalizedString) || /ucek/.test(normalizedString))) return;

          let att = ch.querySelector('a').getAttribute('href');
          if(!att || !att.startsWith('https://exams.keralauniversity.ac.in')) att = null;

          const mailOptions = {
            from: 'Notify',
            to: process.env.TO_EMAIL,
            subject: 'New Update from keralauniversity.ac.in!',
            text: 'A new update is available for the site: '+ site.url + '\n' + res.join("\n"),
            html: template(title, att, site.url, site.name)
          }

          console.log("New Update: " + title + " : " + site.url);
          tr.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log("Email NOT sent: " + error.code);
            } else {
              console.log('Email sent [CHANGED]: ' + mailOptions.to + ' : '+ site.url);
            }
          });
        });
      }else{
        console.log("No updates found: "+ site.url)
      }
    }
  });
}



// Run the cron job
// This will be run every 4 hours everyday
cron();