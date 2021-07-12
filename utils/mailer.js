const nodemailer = require('nodemailer')
require('dotenv').config()


let transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 3000,
    auth: {
        user: process.env.EMAIL,
        password: process.env.PASSWORD
}
})

let mailOptions = {
    from: require.body.email,
    to: 'PKKostov18@codingburgas.bg',
    subject: require.body.subject,
    text: require.body.message
}

transporter.sendMail(mailOptions, function(err, data) {
    if(err)
    {
        console.log('Errpr Occurs', err)
    }
    else
    {
        console.log('Email send')
    }
})


module.exports = transporter;
module.exports = mailOptions;