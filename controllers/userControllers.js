const User = require('../models/users')

const asyncHandler = require('express-async-handler')


const SignUp = asyncHandler(async(req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    user.save()
        .then(() => {
            res.status(201).json({ messege: 'Berhasil Mendaftar'})
        })
        .catch((err) => {
            res.status(400).json({ messege: 'Gagal Mendaftar'})
        })

})

const SignIn = asyncHandler(async(req, res) => {
    User.findOne({
        username: req.body.username
    })
    .then((user) => {
        if(user) {
            if(user.password === req.body.password) {
                res.status(201).json({messege: 'Berhasil Login'})
            } else {
                res.status(404).json({ messege: 'Gagal masuk, password salah'})
            }
        } else {
            res.status(401).json({ messege: 'Username tidak ditemukan'})
        }
    })
    .catch((err) => {
        res.status(401).json({messege: 'Error'})
    })
})

module.exports = {
    SignIn,
    SignUp
}