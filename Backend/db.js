const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://virenderdhillon104:heoajBypqs5Qj5PJ@cluster0.00adopm.mongodb.net/?retryWrites=true&w=majority';


const db = async () => {

    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected ");
    } catch (err) {
        console.log(err);
    }


}
module.exports = db;
