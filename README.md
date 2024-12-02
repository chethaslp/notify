<p align="center">
  <img src ="https://i.ibb.co/5YtR0GS/notify.png" alt="Notify" height=100/><br/>
  <sup>(Built for University College of Engineering, Kariavattom)</sup>
</p>

# Notify
[![Notify Cron Workflow](https://github.com/chethaslp/notify/actions/workflows/main.yml/badge.svg)](https://github.com/chethaslp/notify/actions/workflows/main.yml)

This app notifies about University Notifications & Results when there is a change in the site and mails to all students of a college.

#### Checks for updates in the following sites:
* https://exams.keralauniversity.ac.in/Login/check1 (Notifications)
* https://exams.keralauniversity.ac.in/Login/check8 (Results)
* https://exams.keralauniversity.ac.in/Login/check3 (Time Table)


#### How it works?

Notify frequently crawls the above websites for updates in it's content.
If an update is found, it checks for specific keywords("b.tech" and "2020 scheme" in it's title) to filter out irrelevent notifications.

The update is then cutely compiled into an email template, which is sent to a preconfigured Google Groups mail.
All students of the college are added to the google group which then handles the distribution of mail to everyone's inboxes.


> Cron frquency is optimised for keralauniversity.ac.in's update timings, usually during office hours. Runs for:
 > - every 4 hours, between 00:00 and 10:00, 
 > - every hour for 10:00 through 18:00, 
 > - and every 4 hours, between 18:00 and 23:00



#### How to deploy your own notify?

* Notify's DB is built on [Supabase](https://supabase.co).
* Notify is deployed on Github Actions, which also handles the cron job.

For deployment: 
  1. Fork this repository.
  2. Configure the following Environment Secrets in the Github Repo with the environment named "Notify - cron" :
      * EM_ID : Sender eEmail ID
      * EM_PW : Sender eEmail Password
      * SUPABASE_URL : Supabase URL 
      * SUPABASE_KEY : Supabase Service Key
      * TO_EMAIL : Receiver's eMail ID (Google Group eMailID)
  3. That's it. Github will automatically identify the actions and executes it every 4 hrs.


#### This repo is open for contributions, feel free to improve it.
