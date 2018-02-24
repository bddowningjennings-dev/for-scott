const
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
    let photos = [], photos_long = []
    for (let file of req.files) {
      photos_long.push(__dirname + file.path)
      photos.push('uploads/' + file.filename)
    }
    req.body.photos = photos
    req.body.photos_long = photos_long
    req.body.user = req.session.userid
    Upload.create(req.body, (err, upload) => {
      if (err) return res.json(err)
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