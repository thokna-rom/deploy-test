const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    profile_picture_path: {
        type: String,
        default: ''
    },
    profile_view: {
        type: Number,
        default: 0
    },
    impress: {
        type: Number,
        default: 0
    },
    social_media: {
        type: Array,
        default: []
    },
    friends: {
        type: Array,
        default: []
    }


}, { timestamps: true });
const User = mongoose.model('User', UserSchema);
module.exports = User;