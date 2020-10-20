function me(covers) {
  var nodemailer = require('nodemailer');

  const USER = process.env.USU;
  const PASS = process.env.PAS;
  const TO = process.env.MAILTO;

  var today = new Date();
  var today = (today.getDate())+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: USER+'@gmail.com',
      pass: PASS
    }
  });

  var mailOptions = {
    from: USER+'@gmail.com',
    to: TO,
    subject: '📰 Jornais ['+today+']',
    html: covers,
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email capas enviado ['+today+'] ' + info.response);
    }
  });
}

module.exports = {me}