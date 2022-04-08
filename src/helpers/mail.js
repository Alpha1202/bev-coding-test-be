import sgMail from '@sendgrid/mail';

const dotenv = require('dotenv');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = async (msg) => {
  try {
    const resp = await sgMail.send(msg)
     console.log(resp)
     
  } catch (error) {
      console.log(error, 'error message from email service server')
      if (error.response) {
      console.error(error.response.body)
      }
  }
}