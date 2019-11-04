'use strict'
const mongoose = require('mongoose'),
    {Schema} = mongoose;

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    age: {type: Number, required: true},
    dateRegister: {type: Date, default: Date.now}
});

module.exports = mongoose.model('user', UserSchema);