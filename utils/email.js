/* eslint-disable import/no-extraneous-dependencies */
const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');
// const { Resend } = require('resend');
// const Transport = require('nodemailer-brevo-transport');

// new Email(user, url).sendWelcome();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Hakeem Olaogun <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   // Resend
    //   // const resend = new Resend('re_NZVddjqo_3fL9XWyxpYBbaqbZWxkg4N9r');
    //   // return resend.emails;

    //   // API KEY: knNRYEp2BZAC7bwU
    //   return nodemailer.createTransport(
    //     new Transport({ apiKey: `${process.env.SENDINBLUE_API_KEY}` }),
    //   );
    // }

    // return nodemailer.createTransport({
    //   // service: 'Brevo',
    //   host: process.env.SENDINBLUE_HOST,
    //   port: process.env.SENDINBLUE_PORT,
    //   auth: {
    //     user: process.env.SENDINBLUE_LOGIN,
    //     pass: process.env.SENDINBLUE_PASSWORD,
    //   },
    // });

    // return nodemailer.createTransport(
    //   new Transport({ apiKey: `${process.env.SENDINBLUE_API_KEY}` }),
    // );

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email option
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // 3) Create a transport and send email
    /* 
    .send({
        from: 'onboarding@resend.dev',
        to: 'holumidey70@gmail.com',
        subject: 'Hello World',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
      });
    */
    // if (process.env.NODE_ENV === 'production')
    //   await this.newTransport().send(mailOptions);
    // else if (process.env.NODE_ENV === 'development')
    //   await this.newTransport().sendMail(mailOptions);

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for 10 min)',
    );
  }
};
