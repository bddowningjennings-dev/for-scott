const
  mailer = require('../controllers/mail'),
  mongoose = require('mongoose'),
  Upload = require('../models/uploads')

class UploadController {
  index(req, res) {
    Upload.find({}, (err, uploads) => {
      if (err) return res.json(err)
      return res.json(uploads)
    })
  }
  create(req, res) {
    let photos = [], photos_long = [], attachments = []
    let html = `<p>${ req.session.userid }</p><p>${req.body.msg}</p>`    
    for (let file of req.files) {
      photos_long.push(__dirname + '/../../' + file.path)
      photos.push('uploads/' + file.filename)
      attachments.push({
          filename: file.filename,
          path: __dirname + '/../../' + file.path,
          cid: file.filename
      })
      html += `<p><img style="width:500px" src="cid:${file.filename}"/></p>`
    }
    req.body.photos = photos
    req.body.photos_long = photos_long
    req.body.user = req.session.userid
    Upload.create(req.body, (err, upload) => {
      if (err) return res.json(err)
      let body = { html, attachments }
      mailer('somahdasauce@gmail.com', body)
      return res.redirect('/dash')
    })
  }
  show(req, res) {
    Upload.findOne({ _id: req.params.id }, (err, upload) => {
      if (err) return res.json(err)
      return res.json(upload)
    })
  }
  delete(req, res) {

  }
  update(req, res) {

  }
}

module.exports = new UploadController()