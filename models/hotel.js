const mongoose = require('mongoose')
const hotelSchema = new mongoose.Schema({
    namaHotel: {
        type: String,

    },
    alamat: {
        type: String,

    },
    fasWifi: {
        type: String,
        default: 0
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
    imgHotel: {
        type: String
    }

})

exports.Hotel = new mongoose.model('Hotel', hotelSchema);
