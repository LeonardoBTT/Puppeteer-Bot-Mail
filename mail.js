function me(covers) {
  var nodemailer = require('nodemailer');

  const USER = 'leonardo1silva2';
  const PASS = 'qwer0125698'

  var today = new Date();
  var today = (today.getDate())+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: USER+'@gmail.com',
      pass: PASS
    }
  });

  var mailOptions = {
    from: USER+'@gmail.com',
    to: 'leonardo.bits@gmail.com',
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