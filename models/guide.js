const mongoose = require('mongoose')
const guideSchema = new mongoose.Schema({
  nama: {
    type: String,

  },
  work: {
    type: String,

  },
  imgProfil: {
    type: String,

  },
  desc: {
    type: String,

  },
  lokasi: {
    type: String,

  },
  alt: {
    type: String,

  },
  email: {
    type: String,

  },
  password: {
    type: String,

  },
  rating: {
    type: String,

  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  },
})

exports.Guide = new mongoose.model('Guide', guideSchema);
