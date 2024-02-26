//node-mailer
const nodemailer = require('nodemailer');


const User = require('../models/user');


const {  MAIL_SERVER_USER_NAME,MAIL_SERVER_USER_PASSWORD } = require('../utils/secrets');

const { generate: generateToken, decode: decodeToken } = require('../utils/token');

// Create a transporter object using SMTP details
const transporter = nodemailer.createTransport({
    host: 'email-smtp.eu-central-1.amazonaws.com',
    port: 25,
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
    console.log(setpass_token);
    console.log(`http://localhost:3000/resetpass/${setpass_token}`);
    console.log(decodeToken(setpass_token));
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
          <p><a href="http://localhost:3000/associates/resetpass/${setpass_token}" target="_blank">Set Your Password</a></p>
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
          <p><a href="http://localhost:3000/associates/resetpass/${setpass_token}" target="_blank">Set Your Password</a></p>
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


  exports.bookingSucessMail = async (req,res) => {
    
    console.log("From booking success mail "+JSON.stringify(req.body));
    // Extract email data from request body
    let id = req.body.booked_for_id;
    const seat_no = req.body.seat_number;
    const booked_by = req.body.seat_booked_by;
    console.log("Sending mail for this id "+id);
    User.findOne({where:{
      associate_id:id
    }}).then(user=>{
      console.log("Booked for user "+JSON.stringify(user));

      const mailOptions = {
        from: 'seating_app@compliance.esko-saas.com',
        to: user.email,
        subject: "Booking successful! | Book Your Seat",
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
            <h2>A seat has been booked for you !</h2>
            <p>Please find the booking details below!</p>
            <p>Seat number: ${seat_no}</p>
            <p>Booked By: ${booked_by}</p>
            <p>If you want to cancel this seat. You can do it under your booking history page</p>
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
    }).catch(err=>{
      console.log("Error while fetching user data in bookingsuccessmail controller "+err);
    })
   
   
    
  }