const User = require('../controllers/user')
const Upload = require('../controllers/upload')

module.exports = (app, upload) => {
  app.get('/', (req, res) => {
    if (req.session.userid) return res.redirect('/dash')    
    return res.render('login')
  })
  app.get('/dash', isLoggedIn, User.dashboard)

  app.post('/login', User.login)
  app.get('/logout', User.logout)

  app.post('/uploads', upload.array('photos', 6), Upload.create)
  app.get('/uploads', Upload.index)
  app.get('/uploads/:id', Upload.show)

  app.get('/admin', isLoggedIn, User.admin)
}

const isLoggedIn = (req, res, next) => req.session.userid ? next() : res.redirect('/')
