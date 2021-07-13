process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require('express');
const nodemailer = require("nodemailer");

let router = express.Router();

router.use(express.json());

router.get('/contact', function (req, res) {
    res.render('contact');
    
});

router.post('/contact', function (req, res){

    let formData = req.body;
    console.log(formData);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        host: 'smtp.gmail.com',
        secure: true,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'PKKostov18@codingburgas.bg',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error) {
            console.log(error);
            res.send('error');
        }
        else {
            console.log('Email sent');
            res.redirect('/contact')
        }
    })
});

module.exports = router;