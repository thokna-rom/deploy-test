const express = require("express");
const router = express.Router();
const multer = require("multer");
const postController = require("../controller/PostController");
const path = require('path');
const axios = require("axios");
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, 'upload');
  // },
  destination: (req, file, cb) => {
    cd(null, '../upload');
  },
  // filename: function (req, file, cb) {
  //   const filename = file.fieldname + '_' + Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg';
  //   req.body.image_path = filename;
  //   cb(null, filename);
  // }
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// const upload = multer({ storage: storage });
const upload = multer({
  storage: storage ,
  limits: {fileSize: 100 * 1024},
});

router.post("/add-post", upload.single('image'), async (req, res, next) =>{
  if (!req.file) {
    return res.status(400).json({message: "No image upload!"})
  }
  try {
    // Upload the image to Imgur
    const formData = new FormData();
    formData.append('image', req.file.buffer.toString('base64'));
    formData.append('type', 'base64');

    const imgurResponse = await axios.post('https://api.imgur.com/3/image', formData, {
      headers: {
        'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: "Error occurred while uploading image to Imgur"})
  }
}, postController.addPost);
router.post("/like-un-like", postController.likeUnLike);
router.get("/get-all-post", postController.getAllPost);


module.exports = router;
