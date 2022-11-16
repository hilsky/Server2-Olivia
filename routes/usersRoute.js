const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { User } = require('../models/users');

router.post('/', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        jenisKelamin: req.body.jenisKelamin,
        profilPic: req.body.profilPic
    });
    user.save()
        .then(() => {
            res.send(user);
        }
        )
        .catch((err) => {
            res.send(err);
        }
        );
})

router.get('/', (req, res) => {
    User.find()
        .then((users) => {
            res.send(users);
        }
        )
        .catch((err) => {
            res.send(err);
        }
        );
}
)

router.get('/:id', (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            User.findById(req.params.id)
                .then((user) => {
                    res.send(user);
                }
                )
                .catch((err) => {
                    res.send(err);
                }
                );
        }
        else {
            res.send('Invalid ID');
        }
    }
    catch (err) {
        res.send(err);
    }
}
)

router.put('/:id', (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            User.findByIdAndUpdate(req.params.id, {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                alamat: req.body.alamat,
                kota: req.body.kota,
                prov: req.body.prov,
                noHp: req.body.noHp,
                jenisKelamin: req.body.jenisKelamin,
                profilPic: req.body.profilPic
            }, { new: true })
                .then((user) => {
                    res.send(user);
                }
                )
                .catch((err) => {
                    res.send(err);
                }
                );
        }
        else {
            res.send('Invalid ID');
        }
    }
    catch (err) {
        res.send(err);
    }
}
)

router.delete('/:id', (req, res) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            User.findByIdAndDelete(req.params.id)
                .then((user) => {
                    res.status(201).json({ messege: 'Data berhasil dihapus' });
                }
                )
                .catch((err) => {
                    res.send(err);
                }
                );
        }
        else {
            res.send('Invalid ID');
        }
    }
    catch (err) {
        res.send(err);
    }
}
)

//SIGN UP
router.post('/signup', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        profilPic: req.body.profilPic
    });


    // const duplicate = user.findOne({username}).lean().exec()
    // if(duplicate) {
    //     return res.status(409).json({messege: 'Username telah digunakan'})
    // }
    user.save()
        .then(() => {
            res.status(201).json({ messege: 'Berhasil Mendaftar' });
        }
        )
        .catch((err) => {
            res.status(401).json({ messege: 'Gagal Mendaftar' });;
        }
        );
}
)

//SIGN IN
router.post('/signin', (req, res) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                if (user.password === req.body.password) {
                    res.status(201).json({ messege: 'Berhasil Login' });
                }
                else {
                    res.status(401).json({ messege: 'Password salah' });
                }
            }
            else {
                res.status(401).json({ messege: 'Username salah' });
            }
        }
        )
        .catch((err) => {
            res.status(400).json({ messege: 'User tidak ditemukan' })
        }
        );
}
)

module.exports = router;
