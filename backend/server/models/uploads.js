const
  mongoose = require('mongoose')

const UploadSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  photos: {
    type: [String],
    required: true
  },
  photos_long: {
    type: [String],
    required: true
  },
  msg: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Upload', UploadSchema)