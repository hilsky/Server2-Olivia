const mongoose = require('mongoose');

const wisataSchema = new mongoose.Schema({
    namaWisata: {
        type: String,
    },
    desc: {
        type: String
    },
    lokasi: {
        type: String,
    },
    kota: {
        type: String
    },
    prov: {
        type: String
    },
    imageBg: {
        type: String
    },
    like: {
        type:String
    }
})

exports.Wisata = new mongoose.model('Wisata', wisataSchema)