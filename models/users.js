const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
         type: String,
         required: true,
    },
     password: {
         type: String,
         required: true,
     },
     email: {
         type: String,
         required: true,
     },
     nama: {
        type: String,
     },
     jenisKelamin: {
        type: String
     },
     noHp: {
        type: Number
     },
     alamat: {
        type: String
     },
     kota: {
        type: String
     },
     prov: {
        type: String
     },
     profilPic: {
        type: String,
     }
 })
 
 exports.User = new mongoose.model('User', userSchema);
 