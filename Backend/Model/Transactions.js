const mongoose=require('mongoose');


const Transactions = new mongoose.Schema({
     
    title:{
        type:String,
    },

    creator :{
        type : String
    },

    name:{
        type:String
    },

    email:{
        type: String
    },

    amount: {
        type : Number
    },

    order_id:{
        type : String
    },

    time:{
        type : String
    }

});

module.exports=mongoose.model('Transactions',Transactions);
