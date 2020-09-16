const express = require('express');
const multer  = require('multer')
const nodePath = require('path');
const router  = express.Router();
const fs     = require('fs');

const upload = multer({ dest: 'M_Uploads/' })

router.post('/' , upload.single('file') , (req , res) =>{
  const { originalname , path } = req.file;
  const file = fs.readFileSync(path);
  fs.writeFileSync(nodePath.join(process.env.SYNC_DOWNLOAD_DIR, originalname), file);
  fs.unlinkSync(path);
  res.status(200).send("success");
});

router.get('/' , (req , res) =>{
  res.status(200).send("success");
});

module.exports = router;
