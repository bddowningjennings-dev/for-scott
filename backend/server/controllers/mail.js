const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: secr,
         pass: secret
     }
 });

// let sendTo = 'somahdasauce@gmail.com' // email(s)
// let html = '<p>Your html here. IMG: <img src="cid:myPicture"/></p>' // plain text body
// let attachments = [{
//   filename: 'img.jpg',
//   path: 'img.jpg',
//   cid: 'myPicture' //same cid value as in the html img src
// }]
// let body = { html, attachments }
// console.log(body)
// console.log(body.html, body.attachments)

module.exports = (sendTo, body) => {
  let mailOptions = {
    to: sendTo,
    subject: 'from server', // Subject line
    html: body.html,
    attachments: body.attachments
  }
  transporter.sendMail(mailOptions, (err, info) => err?console.log(err):console.log(info))
}