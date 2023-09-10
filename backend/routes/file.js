const express = require('express');
const router = express.Router();
const File = require('../modules/File')
let fetchUser = require('../middleware/fetchUser');
const multer = require('multer')

// const upload = multer({ dest: "src/uploads" })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post('/upload' ,fetchUser ,upload.single("file") ,async (req,res)=>{
    try {
        
        const fileData = {
            user : req.user.id,
            name : req.file.originalname,
            path: req.file.path,
            originalName: req.file.originalname,
            parent : req.body.parent
        }

        const file = await File.create(fileData)
        let success = true
        res.send(file)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occuredss")
    }
})

router.post('/share/:id', fetchUser, async (req,res)=>{
  try {
      
    let fileShare = await File.findById(req.params.id);

    if (!fileShare) {
      return res.status(400).send("file doesnt exist");
    }

      const fileData = {
          user : req.user.id,
          name : fileShare.name,
          path: fileShare.path,
          originalName: fileShare.originalName,
          parent : '5ce819935e539c343f141ece'
      }

      const file = await File.create(fileData)
      let success = true
      res.send(success)

  } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occuredss")
  }
})


//auth token nikal aur file show download nahi

router.get("/getfile/:id" , async (req, res) => {

  const file = await File.findById(req.params.id) 


  const filePath = path.join(__dirname, file.path);

    res.sendFile(filePath, { root: '/' }, (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
    });
    
    res.sendFile(file.path, file.originalName)
});

router.delete('/deletefile/:id', async (req,res)=>{

  try {
      
      let file = await File.findByIdAndDelete(req.params.id)
      res.json(file);    
  
  } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured")
  }
  
})

module.exports = router