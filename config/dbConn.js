const mongoose = require('mongoose')
const db = require('../models')
const Role = db.role;


const ConnectDB = async () => {
    mongoose.
        connect(
            process.env.URI_DB,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then(() => {
            console.log('Connected to MongoDB');
            initial()
        })
        .catch((err) => {
            console.log(err);
            process.exit()
        });


    function initial() {
        Role.estimatedDocumentCount((err, count) => {
            if (!err && count === 0) {
                new Role({
                    name: "user"
                }).save(err => {
                    if (err) {
                        console.log("error", err)
                    }

                    console.log("Berhasil menambahkan 'user' ke dalam koleksi roles")
                });

                new Role({
                    name: "pemandu"
                }).save(err => {
                    if (err) {
                        consoloe.log("error", err);
                    }
                    console.log("Berhasil menambahkan 'pemandu' ke dalam koleksi roles")
                })

                new Role({
                    name: "admin"
                }).save(err => {
                    if (err) {
                        console.log("error", err)
                    }

                    console.log("Berhasil menambahkan 'admin' ke dalam koleksi roles")
                })
            }
        })
    }

}

module.exports = ConnectDB