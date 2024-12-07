const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    description: {
        type: String,
        default: ""
    },
    image_path: {
        type: String,
        default: "",
        required: true
    },
    like: {
        type: [Schema.Types.ObjectId],
        ref: 'User', // Optional if you plan to populate user data
        default: []
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    user_profile_picture_path: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
