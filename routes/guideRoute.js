const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Guide } = require('../models/guide')

router.post('/', (req, res) => {
    const guide = new Guide({
        nama: req.body.nama,
        work: req.body.work,
        imgProfil: req.body.imgProfil,
        username: req.body.username,
        desc: req.body.desc,
        lokasi: req.body.lokasi,
        alt: req.body.alt,
        emaiil: req.body.email,
        password: req.body.password,
        rating: req.body.rating
    });
    guide.save()
        .then(() => {
            res.status(200).json({ messege: "Berhasil ditambahkan" });
        }
        )
        .catch((err) => {
            res.send(err);
        }
        );
})

router.get('/', (req, res) => {
    Guide.find()
        .then((Guides) => {
            res.send(Guides);
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
            Guide.findById(req.params.id)
                .then((Guide) => {
                    res.send(Guide);
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
            Guide.findByIdAndUpdate(req.params.id, {
                nama: req.body.nama,
                work: req.body.work,
                imgProfil: req.body.imgProfil,
                username: req.body.username,
                desc: req.body.desc,
                lokasi: req.body.lokasi,
                alt: req.body.alt,
                email: req.body.email,
                password: req.body.password,
                rating: req.body.rating
            }, { new: true })
                .then((Guide) => {
                    res.send(Guide);
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
            Guide.findByIdAndDelete(req.params.id)
                .then((Guide) => {
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
//     const Guide = new Guide({
//         nama: req.body.nama,
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email,
//         jenisKelamin: req.body.jenisKelamin,
//         profilPic: req.body.profilPic
//     });


//     // const duplicate = Guide.findOne({Guidename}).lean().exec()
//     // if(duplicate) {
//     //     return res.status(409).json({messege: 'Guidename telah digunakan'})
//     // }
//     Guide.save()
//         .then(() => {
//             res.status(201).json({ messege: 'Berhasil Mendaftar'});
//         }
//         )
//         .catch((err) => {
//             res.status(401).json({ messege: 'Gagal Mendaftar'});;
//         }
//         );
// }
// )

// //SIGN IN
// router.post('/signin', (req, res) => {
//     Guide.findOne({Guidename: req.body.Guidename})
//         .then((Guide) => {
//             if(Guide){
//                 if(Guide.password === req.body.password){
//                     res.status(201).json({ messege: 'Berhasil Login'});
//                 }
//                 else{
//                     res.status(401).json({ messege: 'Password salah'});
//                 }
//             }
//             else{
//                 res.status(401).json({ messege: 'Guidename salah'});
//             }
//         }
//         )
//         .catch((err) => {
//             res.status(400).json({ messege: 'Guide tidak ditemukan'})
//         }
//         );
// }
// )

module.exports = router;
