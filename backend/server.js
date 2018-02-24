const
  PORT = process.env.PORT || 8000,
  DATABASE = 'for-scott'
  bodyParser = require('body-parser'),
  session = require('express-session');
  cors = require('cors'),
  multer = require('multer'),
  express = require('express'),
  app = express()

const UPLOAD_PATH = 'public/static/uploads';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${UPLOAD_PATH}/`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

app.set('view engine', 'pug')
app.set('views', __dirname + '/public/views')

app.use(cors())
app.use(express.static(__dirname + '/public/static'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'gibberish',
  resave: true,
  saveUninitialized: true
}));

require('./server/config/mongoose')(DATABASE)
require('./server/config/routes')(app, upload)

app.listen(PORT, ()=>console.log(`(server): listening on port ${PORT}...`))

