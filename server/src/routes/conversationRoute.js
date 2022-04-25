const ConversationController = require("../app/controllers/ConversationController");

const router = require("express").Router();
const verifyToken = require("../app/middleware/verifyToken");

router.post("/", verifyToken, ConversationController.create);
router.get("/", verifyToken, ConversationController.get);
router.get(
    "/find/:firstUserId/:secondUserId",
    verifyToken,
    ConversationController.getConversation
);

module.exports = router;
