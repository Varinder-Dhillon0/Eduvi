const mongoose = require('mongoose');

const Courses = new mongoose.Schema({

    title: {
        type: String,
    },

    desc: {
        type: String,
    },

    background: {
        type: String,
    },

    createdAt: {
        type: Date
    },

    price: {
        type: Number
    },

    category: {
        type: String
    },

    creator: {
        type: String
    },

    email: {
        type: String
    },

    certificate: {
        type: Boolean
    },

    language: {
        type: String
    },

    content: [{
        title: { type: String },
        video: [{
            videotitle: { type: String },
            videolink: { type: String },
            videodesc: { type: String }
        }]
    }],

    learnthis :{type : String},
    coursefor:{type : String},
    prerequisites:{type:String}

});

module.exports = mongoose.model('Courses', Courses);
