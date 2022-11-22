const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Hotel } = require('../models/hotel')

router.post('/', (req, res) => {
    const hotel = new Hotel({
        namaHotel: req.body.namaHotel,
        alamat: req.body.alamat,
        fasWifi: req.body.fasWifi,
        fasParkir: req.body.fasParkir,
        fasSarapan: req.body.fasSarapan,
        rating: req.body.rating,
    });
    hotel.save()
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
    Hotel.find()
        .then((hotel) => {
            res.send(hotel);
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
            Hotel.findById(req.params.id)
                .then((hotel) => {
                    res.send(hotel);
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
            Hotel.findByIdAndUpdate(req.params.id, {
                namaHotel: req.body.namaHotel,
                alamat: req.body.alamat,
                fasWifi: req.body.fasWifi,
                fasParkir: req.body.fasParkir,
                fasSarapan: req.body.fasSarapan,
                rating: req.body.rating,

            }, { new: true })
                .then((hotel) => {
                    res.send(hotel);
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
            Hotel.findByIdAndDelete(req.params.id)
                .then((hotel) => {
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
