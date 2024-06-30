const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    username: String,
    email: String,
    avatar: Buffer
})

module.exports = mongoose.model('User', userSchema);