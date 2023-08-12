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
    cb(null, file.originalname + '.pdf');
  },
});

const upload = multer({ storage: storage });

//auth token nikal bhai

router.post('/upload' ,upload.single("file") ,async (req,res)=>{
    try {

        const fileData = {
            path: req.file.path,
            originalName: req.file.originalname,
        }

        const file = await File.create(fileData)
        let success = true
        res.send(file)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured")
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

module.exports = router