const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Wisata } = require('../models/wisata')

router.post('/', (req, res) => {
    const wisata = new Wisata({
        namaWisata: req.body.namaWisata,
        imageBg: req.body.imageBg,
        prov: req.body.prov,
        like: req.body.like,
        desc: req.body.desc,
        lokasi: req.body.lokasi,
        kota: req.body.kota,
        rating: req.body.rating,
        imgBg: req.body.imgBg

    });
    wisata.save()
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
    Wisata.find()
        .then((Wisata) => {
            res.send(Wisata);
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
            Wisata.findById(req.params.id)
                .then((Wisata) => {
                    res.send(Wisata);
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
            Wisata.findByIdAndUpdate(req.params.id, {
                namaWisata: req.body.namaWisata,
                imageBg: req.body.imageBg,
                prov: req.body.prov,
                like: req.body.like,
                lokasi: req.body.lokasi,
                kota: req.body.kota,
                rating: req.body.rating,
                imgBg: req.body.imgBg
            }, { new: true })
                .then((Wisata) => {
                    res.send(Wisata);
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
            Wisata.findByIdAndDelete(req.params.id)
                .then((Wisata) => {
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
//     const Wisata = new Wisata({
//         nama: req.body.nama,
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email,
//         jenisKelamin: req.body.jenisKelamin,
//         profilPic: req.body.profilPic
//     });


//     // const duplicate = Wisata.findOne({Wisataname}).lean().exec()
//     // if(duplicate) {
//     //     return res.status(409).json({messege: 'Wisataname telah digunakan'})
//     // }
//     Wisata.save()
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
//     Wisata.findOne({Wisataname: req.body.Wisataname})
//         .then((Wisata) => {
//             if(Wisata){
//                 if(Wisata.password === req.body.password){
//                     res.status(201).json({ messege: 'Berhasil Login'});
//                 }
//                 else{
//                     res.status(401).json({ messege: 'Password salah'});
//                 }
//             }
//             else{
//                 res.status(401).json({ messege: 'Wisataname salah'});
//             }
//         }
//         )
//         .catch((err) => {
//             res.status(400).json({ messege: 'Wisata tidak ditemukan'})
//         }
//         );
// }
// )

module.exports = router;
