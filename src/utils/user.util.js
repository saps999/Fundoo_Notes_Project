const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '354086324396-ck8lnft832ngl95659ct9aok3qgi8b45.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//040MQygDa-vgYCgYIARAAGAQSNwF-L9Iryoj_y015y_Wu71F5wAlvq2JLsKqJhA-S8lVPGRGm9IQJX3h_-o5Yp9GnuB1BFycBsaw';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(email,token) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'saptarshibiswasgang@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
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
