const router = require("express").Router();
const verifyToken = require("../app/middleware/verifyToken");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({ storage });

router.post("/", verifyToken, upload.single("file"), (req, res) => {
    try {
        return res
            .status(200)
            .json({ success: true, message: "File uploaded successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

module.exports = router;
