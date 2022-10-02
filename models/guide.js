const mongoose = require('mongoose')
const guideSchema = new mongoose.Schema({
    nama: {
      type: String,
      require: true
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
      
    }
 })
 
 exports.Guide = new mongoose.model('Guide', guideSchema);
 