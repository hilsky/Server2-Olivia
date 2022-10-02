const mongoose = require('mongoose')

const ConnectDB = async () => {
        mongoose.
        connect(
            process.env.URI_DB,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.log(err);
        });
    
}

module.exports = ConnectDB