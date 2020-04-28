const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/images/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage }).array("file");

app.get("/", function(req, res) {
  return res.send("Hello Server");
});
app.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
      // A Multer error occurred when uploading.
    } else if (err) {
      return res.status(500).json(err);
      // An unknown error occurred when uploading.
    }
    console.log('Success !');
    return res.status(200).send({
      message: "Your file has been successfully uploaded"
    });
    // Everything went fine.
  });
});

app.listen(8000, function() {
  console.log("App running on port 8000");
});
