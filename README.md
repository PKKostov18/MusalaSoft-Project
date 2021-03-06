<p align="center" text-align="center">
<img src="https://github.com/PKKostov18/MusalaSoft-Project/blob/main/public/img/transparentLogo.png" width="850" height="350">  
  
<h1 align="center" >Job Posting </h1>
</p>

<div align="center">

[![Contributors](https://img.shields.io/github/contributors/PKKostov18/MusalaSoft-Project.svg?style=for-the-badge)](https://github.com/PKKostov18/MusalaSoft-Project/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/PKKostov18/MusalaSoft-Project?style=for-the-badge)](https://github.com/PKKostov18/MusalaSoft-Project/network/members)
[![Issues](https://img.shields.io/github/issues/PKKostov18/MusalaSoft-Project.svg?style=for-the-badge)](https://github.com/PKKostov18/MusalaSoft-Project/issues)
[![Stargazers](https://img.shields.io/github/stars/PKKostov18/MusalaSoft-Project.svg?style=for-the-badge)](https://github.comPKKostov18/MusalaSoft-Project/stargazers)
[![MIT License](https://img.shields.io/github/license/PKKostov18/MusalaSoft-Project.svg?style=for-the-badge)](https://github.com/PKKostov18/MusalaSoft-Project/blob/master/LICENSE.txt)
</div>
<br>

## Description

This website is running on server which is made with node.js. Our site is about job posting. It has login and register systems which save the 
accounts in local database. When you enter the site you can view all the jobs that are posted and you can apply for them. You can also post new jobs.
By viewing the all the jobs you can filter them by city and category. On our homepage you can search for jobs by their name and by keywords.

## Used technologies

- JavaScript

- EJS

- CSS

- T-SQL

## Features

✅ localhost

✅ database connection

✅ login/register system

## Our Team

Plamen Kostov  | Valentin Petrov
------------- | -------------
Scrum Master  | Front-end
Back-end  | Documentary


## Documentation and Presentation

- [Documentation](https://codingburgas-my.sharepoint.com/:w:/g/personal/pkkostov18_codingburgas_bg/Eb0GCMvgHg9IjHOh8M50VoYBuPfpv1j3NmoXNBTLx_9jlg?e=wDw3zX)
- [Presentation](https://codingburgas-my.sharepoint.com/:p:/g/personal/pkkostov18_codingburgas_bg/EZYs58lcxJdEreahohUcmCsBXcx3GFuWDr0J8O2-Q2E2vQ?e=mErXoq)

***

## How to run the project on your machine

### Step 1: Clone the repository

Open the command prompt and paste this:

`git clone https://github.com/PKKostov18/MusalaSoft-Project`

### Step 2: Navigate to the root folder:

`cd MusalaSoft-Project`

### Step 3: Create `.env` file:

<pre>
SESSION_SECRET = secret
PASSWORD = 'your_gmail_password'
EMAIL = 'your_gmail_email'
</pre>

### Step 4: Create database `MusalaSoft-Internship` and execute the two database scripts which are in the repo: 
`database.sql` file and `login_stored_procedure.sql` file in your Management studio

Configure the `database-config` file:

<pre>
const config = {

    connection: {
        database: "MusalaSoft-Internship",
        server: "your_server_name",
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustedConnection: true,
        encrypt: false,
        trustServerCertificate: false
    },
    users_table: 'Users',
    database: "MusalaSoft-Internship",
    server: "your_server_name", 
};

module.exports.config = config;
</pre>

### Step 5: Install node modules

`npm install`

### Step 6: Type `npm run devStart` and go to `localhost:3000` in your browser

