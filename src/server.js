const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friendsRoutes");
const postRoutes = require("./routes/postRoutes");
const app = express();
// const uploadDir = path.join(__dirname, "../upload");

// ========
const imgur = require("imgur");
const fileUpload = require("express-fileupload")
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi');
})

app.post('./upload', (req, res,) => {
  if (!req.files) {
    return res.status(400).send('No file were uploaded!');
  }

  let sampleFile = req.files.sampleFile
  let uploadPath = __dirname + '/upload' + sampleFile.name

  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err)
    }

    imgur.uploadFile(uploadPath).then((urlObject) => {
      fs.unlinkSync(uploadPath)
      res.send(urlObject)
    })
  })
})

// ========


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

require("dotenv").config();
require("./db");
// import authMiddleware
const verifyToken = require('./middleware/authMiddleware');

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/friend", verifyToken,friendRoutes);
app.use("/api/post", verifyToken,postRoutes);

// Logging middleware
app.use((req, res, next) => {
  console.log("headers", req.headers);
  console.log("body", req.body);
  next();
});

// Routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
