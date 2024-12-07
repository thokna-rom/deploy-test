const express = require("express");
const router = express.Router();
const multer = require("multer");
const postController = require("../controller/PostController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload');
  },
  filename: function (req, file, cb) {
    const filename = file.fieldname + '_' + Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg';
    req.body.image_path = filename;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

router.post("/add-post", upload.single('image'), postController.addPost);
router.post("/like-un-like", postController.likeUnLike);
router.get("/get-all-post", postController.getAllPost);


module.exports = router;
