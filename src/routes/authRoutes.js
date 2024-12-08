const express = require("express");
const router = express.Router();
const authController = require("../controller/AuthController");
const multer = require("multer");
const verifyToken = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload');
  },
  filename: function (req, file, cb) {
    const filename = file.fieldname + '_' + Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpg';
    req.body.profile_picture_path = filename;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

router.post("/register", upload.single('image'), authController.register);
router.post("/login", authController.login);
router.get("/check-auth", verifyToken, authController.checkAuth);

module.exports = router;
