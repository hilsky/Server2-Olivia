const mongoose = require("mongoose");

const User = mongoose.model(
   "User",
   new mongoose.Schema({
      fullName: String,
      email: String,
      password: String,
      username: String,
      noWa: String,
      alamat: String,
      imgProfil: String,
      linkWa: String,
      roles: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
         }
      ],
      createdAt: {
         type: Date,
         default: Date.now()
      },
      updateAt: {
         type: Date,
         default: Date.now()
      }
   })
);

module.exports = User;