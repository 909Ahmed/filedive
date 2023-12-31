const mongoose =require('mongoose')
const {Schema} =mongoose;

const FileSchema = new Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    name :{
        type : String
    },
    parent :{
        type : String
    },
    path:{
        type :String,
        require :true
    },
    originalName:{
        type :String,
        require :true
    }
});

module.exports = mongoose.model('file',FileSchema)