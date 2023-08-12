const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/learn'

const connectToMongo=()=>{
    mongoose.connect(mongoURI);
    console.log("connected to mongo");
}

module.exports = connectToMongo;