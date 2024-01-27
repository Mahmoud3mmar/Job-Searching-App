
import nodemailer from "nodemailer"
import  dotenv from "dotenv";

dotenv.config()
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.email,
      pass: process.env.email_pass
    },
    secure: true,
  });


  export default transporter