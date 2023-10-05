const { ObjectId } = require('mongodb');
const mongoose=require('mongoose');


const User= new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },

    verified:{
        type : Boolean
    },

    Courses: [{
        id: {type : ObjectId},
        title: { type: String},
        creator: { type: String},
        background : {type : String},
        amount: { type: Number},
        order_id : {type : String},
        method : {type : String},
        content: [{
            title: { type: String },
            video: [{
                videotitle: { type: String },
                videolink: { type: String },
                videodesc: { type: String }
            }]
        }],
        time: {type: String}
    }],

    creator:{
        type : Boolean
    }

});

module.exports=mongoose.model('User',User);
