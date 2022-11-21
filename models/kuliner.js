const mongoose = require('mongoose')
const kulinerSchema = new mongoose.Schema({
    namaKuliner: {
        type: String,

    },
    alamat: {
        type: String,

    },
    jamBuka: {
        type: String,


    },
    jamTutup: {
        type: String,
    },
    hariBuka: {
        type: String,
        default: 0

    },
    hariTutup: {
        type: String,

    },

})

exports.Kuliner = new mongoose.model('Kuliner', kulinerSchema);
