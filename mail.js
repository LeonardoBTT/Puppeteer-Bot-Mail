function me(covers) {
  var nodemailer = require('nodemailer');

  const USER = process.env.USU;
  const PASS = process.env.PAS;
  const TO = process.env.MAILTO;

  var today = new Date();
  var today = ("0" + today.getDate()).slice(-2)+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: USER,
      pass: PASS
    }
  });

  var mailOptions = {
    from: USER,
    to: TO,
    subject: '📰 Jornais ['+today+']',
    html: covers
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