const
  mongoose = require('mongoose'),
  User = require('../models/users')
  Upload = require('../models/uploads')

class UserController {
  login(req, res) {
    User.findOne({ 'email': req.body.email }, (err, user) => {
      if (err) return res.json(err)
      if (!user) {
        User.create(req.body, (err, user) => {
          if (err) return res.json(err)
          req.session.userid = user._id
          return res.redirect('/dash') 
        })
      } else {
        req.session.userid = user._id
        return res.redirect('/dash')
      }
    })
  }
  logout(req, res) {
    req.session.destroy()
    return res.redirect('/')
  }
  dashboard(req, res) {
    User.findOne({ '_id' : req.session.userid }, (err, user) => {
      if (err) return res.json(err)
      Upload.find({ "user": user._id }, null, { sort: { createdAt : -1 } }, (err, uploads) => {
        if (err) return res.json(err)
        return res.render('dashboard', { user: user.email, uploads: uploads })
      })
    })
  }
  admin(req, res) {
    let userlist = []
    User.find({}, (err, users) => {
      if (err) return res.json(err)
      userlist = users
    })
    User.findOne({ _id: req.session.userid }, (err, user) => {
      if (err) return res.json(err)
      if (user.email !== 'admin@godzilla.dogbutt') return res.redirect('/dash')
    })
    Upload.find({}, null, { sort: { _id: 1, createdAt: -1 }}, (err, uploads) => {
      if (err) return req.json(err)
      userlist = userlist.map(user => {
        let user_uploads = uploads.filter(upload => upload.user == user._id)
        user.uploads = user_uploads
        return user
      })
      userlist = userlist.filter(user => user.uploads.length > 0)
      return res.render('admin', { users: userlist })
    })
  }
}

module.exports = new UserController()