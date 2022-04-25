const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

class PostController {
    //create a post
    async create(req, res) {
        const newPost = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            res.status(200).json({ success: true, post: savedPost });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //update a post
    async update(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (post.userId === req.userId) {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                return res.status(200).json({
                    success: true,
                    message: "The post has been updated",
                    updatedPost,
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: "You can update only your post",
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //delete a post
    async delete(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (post.userId === req.userId) {
                await post.deleteOne();
                //almost delete comments of post
                await Comment.deleteMany({ postId: req.params.id });
                return res.status(200).json({
                    success: true,
                    message: "The post has been deleted",
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: "You can delete only your post",
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //like a post
    async like(req, res) {
        try {
            const currentPost = await Post.findById(req.params.id);
            if (!currentPost.likes.includes(req.userId)) {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $push: { likes: req.userId },
                    },
                    { new: true }
                );
                return res.status(200).json({
                    success: true,
                    post: updatedPost,
                    message: "You have been liked this post",
                });
            } else {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $pull: { likes: req.userId },
                    },
                    { new: true }
                );
                return res.status(200).json({
                    success: true,
                    post: updatedPost,
                    message: "You have been disliked this post",
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }

    //get a post
    async get(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            return res.status(200).json({ success: true, post });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }

    //get all post in timeline
    async timeline(req, res) {
        try {
            const currentUser = await User.findById(req.userId);
            const userPosts = await Post.find({ userId: currentUser._id });
            //Sử dụng promise để get nhiều post
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({ userId: friendId });
                })
            );
            return res.status(200).json({
                success: true,
                posts: userPosts.concat(...friendPosts),
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //get all posts of a user
    async userPosts(req, res) {
        try {
            const user = await User.findById(req.params.id);
            const posts = await Post.find({ userId: user._id });
            return res.status(200).json({
                success: true,
                posts: posts,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //get all comment of a posts
    async getComments(req, res) {
        try {
            const comments = await Comment.find({ postId: req.params.postId });
            return res.status(200).json({ success: true, comments });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //post a comment of a post
    async postComment(req, res) {
        const newComment = new Comment(req.body);

        try {
            const savedComment = await newComment.save();
            return res
                .status(200)
                .json({ success: true, comment: savedComment });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //delete a comment
    async deleteComment(req, res) {
        try {
            const comment = await Comment.findById(req.params.commentId);
            if (comment.userId === req.userId) {
                await comment.deleteOne();
                return res.status(200).json({
                    success: true,
                    message: "The comment has been deleted",
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: "You can delete only your comment",
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
}
module.exports = new PostController();
