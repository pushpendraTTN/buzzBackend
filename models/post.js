const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        reuired: true
    },
    likes: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    dislikes: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: String,
            ref: "User"
        }
    ],
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Post', postSchema);