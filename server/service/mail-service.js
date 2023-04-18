import nodemailer from "nodemailer";

class MailService {
  constructor() {
    var smtpConfig = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };
    this.transporter = nodemailer.createTransport(smtpConfig);
  }
  async sendActivationsMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Account activation for ${process.env.API_URL}`,
      html: `
      <div>
        <h1>For activation go to the link</h1>
        <a href="${link}">${link}</a>
      </div>
      `,
    });
  }
}

export default MailService;
