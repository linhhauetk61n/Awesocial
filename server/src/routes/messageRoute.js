const MessageController = require("../app/controllers/MessageController");

const router = require("express").Router();
const verifyToken = require("../app/middleware/verifyToken");

router.post("/", verifyToken, MessageController.send);
router.get("/:conversationId", verifyToken, MessageController.get);

module.exports = router;
