const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Kuliner } = require('../models/kuliner')

router.post('/', (req, res) => {
    const kuliner = new Kuliner({
        namaKuliner: req.body.namaKuliner,
        alamat: req.body.alamat,
        jamBuka: req.body.jamBuka,
        jamTutup: req.body.jamTutup,
        hariBuka: req.body.hariBuka,
        hariTutup: req.body.hariTutup
    });
    kuliner.save()
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
    Kuliner.find()
        .then((kuliner) => {
            res.send(kuliner);
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
            Kuliner.findById(req.params.id)
                .then((kuliner) => {
                    res.send(kuliner);
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
            Kuliner.findByIdAndUpdate(req.params.id, {
                namaKuliner: req.body.namaKuliner,
                alamat: req.body.alamat,
                jamBuka: req.body.jamBuka,
                jamTutup: req.body.jamTutup,
                hariBuka: req.body.hariBuka,
                hariTutup: req.body.hariTutup
            }, { new: true })
                .then((kuliner) => {
                    res.send(kuliner);
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
            Kuliner.findByIdAndDelete(req.params.id)
                .then(() => {
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
