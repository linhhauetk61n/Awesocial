const { request } = require("express");
const UserController = require("../app/controllers/UserController");
const verifyToken = require("../app/middleware/verifyToken");

const router = require("express").Router();

router.put("/:id/follow", verifyToken, UserController.follow);
router.put("/:id/unfollow", verifyToken, UserController.unfollow);
router.put("/", verifyToken, UserController.updateProfile);
router.delete("/:id", verifyToken, UserController.delete);
router.get("/", verifyToken, UserController.get);
router.get("/find", verifyToken, UserController.findUsers);
router.get("/all", verifyToken, UserController.getAll);
router.get("/friends/:userId", verifyToken, UserController.getFriends);

module.exports = router;
