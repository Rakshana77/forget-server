const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;


app.use(bodyParser.json());


app.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  
  const resetToken = Math.random().toString(36).substring(7);

 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sonarakshana123@gmail.com', 
      pass: '789789780' 
    }
  });

  const mailOptions = {
    from: 'sonarakshana@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    text: `Please use the following token to reset your password: ${resetToken}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Password reset email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
