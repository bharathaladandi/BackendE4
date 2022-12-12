const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
     name: {
        type: String,
        require: true,
    },
    age: {
        type: String,
    },
})

const UserModel = mongoose.model("user", UserSchema)

module.exports = {
    UserModel
}