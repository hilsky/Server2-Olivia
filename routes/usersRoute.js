const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('../models');
const Role = db.role;
const User = db.user

var bcrypt = require('bcryptjs');

router.post('/', (req, res, next) => {
    const user = new User({
        fullName: req.body.fullName,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
        username: req.body.username,
        noWa: req.body.noWa,
        alamat: req.body.alamat

    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        else if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: "User was registered successfully" })
                    });
                }
            );
        }

        else if (req.body.email) {
            User.findOne({
                email: req.body.email
            }).exec((err, user) => {
                if (err) {
                    res.status(400).send({ message: err });
                    return;
                }

                if (user) {
                    console.log(user)
                    res.status(400).send({ message: "Gagal! Email telah digunakan" })
                    return;
                }

                next();
            });
        }

        else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully" })
                });
            });
        }
    }
    )
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
                fullName: req.body.fullName,
                password: bcrypt.hashSync(req.body.password, 8),
                email: req.body.email,
                username: req.body.username,
                noWa: req.body.noWa,
                alamat: req.body.alamat
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
// router.post('/signup', (req, res) => {
//     const user = new User({
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email,
//         profilPic: req.body.profilPic
//     });


//     // const duplicate = user.findOne({username}).lean().exec()
//     // if(duplicate) {
//     //     return res.status(409).json({messege: 'Username telah digunakan'})
//     // }
//     user.save()
//         .then(() => {
//             res.status(201).json({ messege: 'Berhasil Mendaftar' });
//         }
//         )
//         .catch((err) => {
//             res.status(401).json({ messege: 'Gagal Mendaftar' });;
//         }
//         );
// }
// )

// //SIGN IN
// router.post('/signin', (req, res) => {
//     User.findOne({ username: req.body.username })
//         .then((user) => {
//             if (user) {
//                 if (user.password === req.body.password) {
//                     res.status(201).json({ messege: 'Berhasil Login' });
//                 }
//                 else {
//                     res.status(401).json({ messege: 'Password salah' });
//                 }
//             }
//             else {
//                 res.status(401).json({ messege: 'Username salah' });
//             }
//         }
//         )
//         .catch((err) => {
//             res.status(400).json({ messege: 'User tidak ditemukan' })
//         }
//         );
// }
// )

module.exports = router;
