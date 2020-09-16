const watch = require('node-watch');
const dotenv = require('dotenv');
const fetch  = require('node-fetch');
const fs     = require('fs');
const express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'M_Uploads/' })
const FormData = require('form-data');


var app = express();

//configure dotenv
dotenv.config();

const syncUploadDir = process.env.SYNC_UPLOAD_DIR;

//Watching the folder
watch(syncUploadDir , { recursive : false }, async (evt ,name) => {
  // const stats = fs.statSync(name); // might need for the mode
  const file = fs.createReadStream(name);
  const form = new FormData();
  form.append("file" , file);

  await fetch(`${ process.env.REMOTE_URL }/files` , {
    method : 'POST',
    body   :  form
  });
  fs.unlinkSync(name);
});

// app.post('/files', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })
//
// app.listen(3000 , () => {
//   console.log("Server listening.");
// })
