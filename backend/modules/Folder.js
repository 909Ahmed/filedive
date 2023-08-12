const mongoose =require('mongoose')
const {Schema} =mongoose;

const FolderSchema = new Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    name:{
        type : String,
    },
    parent:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'folder'
    }
});

module.exports = mongoose.model('folder',FolderSchema)