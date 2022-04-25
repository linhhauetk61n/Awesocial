const AuthController = require("../app/controllers/AuthController");

const router = require("express").Router();
const verifyToken = require("../app/middleware/verifyToken");
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/", verifyToken, AuthController.checkLogin);

module.exports = router;
