const PostController = require("../app/controllers/PostController");
const verifyToken = require("../app/middleware/verifyToken");
const router = require("express").Router();

router.post("/", verifyToken, PostController.create);
router.put("/:id", verifyToken, PostController.update);
router.delete("/:id", verifyToken, PostController.delete);
router.put("/:id/like", verifyToken, PostController.like);
router.get("/:id", verifyToken, PostController.get);
router.get("/timeline/all", verifyToken, PostController.timeline);
router.get("/comments/:postId", verifyToken, PostController.getComments);
router.post("/comments", verifyToken, PostController.postComment);
router.delete(
    "/comments/:commentId",
    verifyToken,
    PostController.deleteComment
);
router.get("/profile/:id", verifyToken, PostController.userPosts);

module.exports = router;
