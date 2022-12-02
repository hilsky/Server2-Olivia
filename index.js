const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const ConnectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3500;
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

ConnectDB()
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
app.use('/wisata', require('./routes/wisataRoute'))
app.use('/users', require('./routes/usersRoute'))
app.use('/guide', require('./routes/guideRoute'))
app.use('/hotel', require('./routes/hotelRoute'))
app.use('/kuliner', require('./routes/kulinerRoute'))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


