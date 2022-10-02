const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();
const ConnectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3500;


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

ConnectDB()

app.use('/wisata', require('./routes/wisataRoute'))
app.use('/users', require('./routes/usersRoute'))
app.use('/guide', require('./routes/guideRoute'))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})