const watch = require('node-watch');
const dotenv = require('dotenv');
const fetch  = require('node-fetch');
const express = require('express');
const FormData = require('form-data');
const fs     = require('fs');

var app = express();

app.use('/files',require('../routes/index.js'));
//configure dotenv
dotenv.config();

const syncUploadDir = process.env.SYNC_UPLOAD_DIR;

//Watching the folder
watch(syncUploadDir , { recursive : false }, async (evt ,name) => {
  // const stats = fs.statSync(name); // might need for the mode
  const file = fs.createReadStream(name);
  const form = new FormData();
  form.append("file" , file);

  await fetch(`${ process.env.REMOTE_URL }${process.env.PORT}/files` , {
    method : 'POST',
    body   :  form
  });
  fs.unlinkSync(name);
});

app.listen(process.env.PORT , () => console.log("Server listening on Port "
          ,process.env.PORT));
