//node-mailer
const nodemailer = require('nodemailer');


const User = require('../models/user');

const { generate: generateToken, decode: decodeToken } = require('../utils/token');

// Create a transporter object using SMTP details
const transporter = nodemailer.createTransport({
    host: 'email-smtp.eu-central-1.amazonaws.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'AKIAYUXGM3VQMLJC2FSM',
      pass: 'BC6iA1cAGSWVkTFp4yLrL7+QomPOqQsci3utkMjrPpX4'
    }
  });

  exports.sendMail = async (req, res) => {
    // Extract email data from request body
    const associate_id = req.params.uid;
    let associate_mail;
    try{
     const user =  await User.findOne({where:{
            associate_id:associate_id
        }});
     associate_mail = user.dataValues.email;
    }catch(err){
        console.log("Something went wrong while fetching the mail "+err);
    }
    
    const setpass_token = generateToken(associate_id,associate_mail);

    console.log("Sending mail to ..."+associate_mail);
    // Create email message
    const mailOptions = {
      from: 'seating_app@compliance.esko-saas.com',
      to: associate_mail,
      subject: "Welcome to Book Your Seat!",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Set Your Password</title>
      </head>
      <body>
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Welcome to Book Your Seat</h2>
          <p>You've been added as a new user. To set your password and access your account, please click the link below:</p>
          <p><a href="http://localhost:3000/resetpass/${setpass_token}" target="_blank">Set Your Password</a></p>
          <p>If you did not request this, you can ignore this email and your password will remain unchanged.</p>
          <p>Thanks,<br>Admin</p>
        </div>
      </body>
      </html>
    `, 
      text:"test mail"
    };
  
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.send('Email sent successfully');
      }
    });
  }


  exports.forgotPassMail = async (email) => {
    // Extract email data from request body
    let associate_mail = email;
    // try{
    //  const user =  await User.findOne({where:{
    //         associate_id:associate_id
    //     }});
    //  associate_mail = user.dataValues.email;
    // }catch(err){
    //     console.log("Something went wrong while fetching the mail "+err);
    // }
    
    const setpass_token = "test";

    console.log("Sending mail to ..."+associate_mail);
    // Create email message
    const mailOptions = {
      from: 'seating_app@compliance.esko-saas.com',
      to: associate_mail,
      subject: "Forgot password | Book Your Seat",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Set Your Password</title>
      </head>
      <body>
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Welcome to Book Your Seat</h2>
          <p>Here is the link to reset your password. Please don't share this link with anyone</p>
          <p><a href="http://localhost:3000/resetpass/${setpass_token}" target="_blank">Set Your Password</a></p>
          <p>If you did not request this, you can ignore this email and your password will remain unchanged.</p>
          <p>Thanks,<br>Admin</p>
        </div>
      </body>
      </html>
    `, 
      text:"test mail"
    };
  
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }