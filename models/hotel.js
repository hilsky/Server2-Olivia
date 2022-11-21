const mongoose = require('mongoose')
const hotelSchema = new mongoose.Schema({
    namaHotel: {
        type: String,

    },
    alamat: {
        type: String,

    },
    fasParkir: {
        type: String,
        default: 0

    },
    fasSarapan: {
        type: String,
        default: 0

    },
    rating: {
        type: String,

    },

})

exports.Hotel = new mongoose.model('Hotel', hotelSchema);