
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 25,
    auth: {
      user: '678d7175d17388',
      pass: '34bdf32593fe59',
    },
  });


function forgotPassword (req, res) {
    const { email } = req.body;

    // Generate a random PIN
    const pin = randomstring.generate({
        length: 6,
        charset: 'numeric',
    });

    const mailOptions = {
        from: 'jyothihari37@gmail.com',
        to: email,
        subject: 'Forgot Password - PIN',
        text: `Your PIN for resetting the password is: ${pin}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('PIN sent successfully');
        }
    });
}

module.exports = {
    forgotPassword
};