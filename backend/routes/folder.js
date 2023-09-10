const express = require('express');
const router = express.Router();
const Folder = require('../modules/Folder')
var fetchUser = require('../middleware/fetchUser');
const User = require('../modules/User');
const File = require('../modules/File')

router.post('/fetchfolders',fetchUser ,async (req,res)=>{
    try {
        let folders = await Folder.find({parent : req.body.parent ,user : req.user.id})
        let files = await File.find({parent : req.body.parent ,user : req.user.id})
        res.json(folders.concat(files))
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured")
    }
})

router.post('/addfolder', fetchUser ,async (req,res)=>{

    try {
        const {name ,parent} = req.body
        const folder = new Folder({
            user : req.user.id, name ,parent  
        })
    
        const savedFolder = await folder.save() 
        res.json(savedFolder)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured")
    }
})

router.post('/getparent', async (req,res)=>{

    try {
        const {parent} = req.body
        
        let folder = await Folder.findById(parent); 
        res.json(folder.parent)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured")
    }
})

router.put('/updatename/:id', async (req,res)=>{
    try {
        const {name} =req.body;
        const newname =name;
        named = await Folder.findByIdAndUpdate(req.params.id, {$set :{name :newname}}, {new : true})
        res.json({named});   
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured")
    }
})

router.delete('/deletefolder/:id', async (req,res)=>{

    try {
        
        let folder = await Folder.findByIdAndDelete(req.params.id)
        res.json(folder);    
    
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured")
    }
    
})



module.exports = router