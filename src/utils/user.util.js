const nodemailer = require('nodemailer');
const { google } = require('googleapis');
import dotenv from 'dotenv'
dotenv.config();

// These id's and secrets should come from .env file.
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLEINT_SECRET;
const redirectURI = process.env.REDIRECT_URI;
const refreshToken = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectURI
);
oAuth2Client.setCredentials({ refresh_token: refreshToken });

export async function sendMail(email,token) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'saptarshibiswasgang@gmail.com',
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: 'saps99 <saptarshibiswasgang@gmail.com>',
      to: email,
      subject: 'Reset Password',
      text: 'We have sent you this mail, as you requested for reseting your password',
      html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${process.env.APP_PORT}/${token}">click here</a></h1>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
