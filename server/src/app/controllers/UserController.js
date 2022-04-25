const User = require("../models/User");
const bcrypt = require("bcrypt");

class UserController {
    //update User
    async update(req, res) {
        if (req.userId === req.params.id || req.body.isAdmin) {
            //change Password
            // if (req.body.password) {
            //     try {
            //         const salt = await bcrypt.genSalt(10);
            //         req.body.password = await bcrypt.hash(
            //             req.body.password,
            //             salt
            //         );
            //     } catch (error) {
            //         console.log(error);
            //         return res
            //             .status(500)
            //             .json({ success: false, message: error });
            //     }
            // }
            try {
                const user = await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                const { password, ...updatedUser } = user._doc;
                return res.status(200).json({
                    success: true,
                    message: "Account has been updated",
                    user: updatedUser,
                });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error });
            }
        } else {
            return res.status(403).json({
                success: false,
                message: "You can update only your account",
            });
        }
    }
    //update User profile
    async updateProfile(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.userId,
                {
                    $set: req.body,
                },
                { new: true }
            );
            const { password, ...updatedUser } = user._doc;
            return res.status(200).json({
                success: true,
                message: "Account has been updated",
                user: updatedUser,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //get user friends by id
    async getFriends(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            const friends = await Promise.all(
                user.followings.map((friendId) => {
                    return User.findById(friendId).select({
                        _id: 1,
                        username: 1,
                        profilePicture: 1,
                    });
                })
            );
            return res.status(200).json({ success: true, friends });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }

    //delete user
    async delete(req, res) {
        if (req.userId === req.params.id || req.body.isAdmin) {
            try {
                await User.findByIdAndDelete(req.params.id);
                return res.status(200).json({
                    success: true,
                    message: "Account has been deleted",
                });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error });
            }
        } else {
            return res.status(403).json({
                success: false,
                message: "You can delete only your account",
            });
        }
    }
    //get a user
    async get(req, res) {
        const userId = req.query.userId;
        const username = req.query.username;
        try {
            const user = userId
                ? await User.findById(userId).select("-password")
                : await User.findOne({ username: username });
            const { password, ...returnUser } = user._doc;
            return res.status(200).json({ success: true, user: returnUser });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //get all users not friends
    async getAll(req, res) {
        try {
            const user = await User.findById(req.userId).select("-password");
            const users = await User.find({
                _id: { $nin: [...user.followings, user._id] },
            }).select("-password");
            return res.status(200).json({
                success: true,
                users,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //follow user
    async follow(req, res) {
        if (req.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id).select(
                    "-password"
                );
                //check user đã follow hay chưa
                if (!user.followers.includes(req.userId)) {
                    const updatedUser = await User.findByIdAndUpdate(
                        req.params.id,
                        {
                            $push: { followers: req.userId },
                        },
                        { new: true }
                    );
                    const updatedCurrentUser = await User.findByIdAndUpdate(
                        req.userId,
                        {
                            $push: { followings: req.params.id },
                        },
                        { new: true }
                    );
                    return res.status(200).json({
                        success: true,
                        user: updatedUser,
                        currentUser: updatedCurrentUser,
                        message: "User has been followed",
                    });
                } else {
                    return res.status(403).json({
                        success: false,
                        message: "You already follow this user",
                    });
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error });
            }
        } else {
            return res
                .status(403)
                .json({ success: false, message: "You can't follow yourself" });
        }
    }
    //unfollow user
    async unfollow(req, res) {
        if (req.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id).select(
                    "-password"
                );
                //check user đã follow hay chưa
                if (user.followers.includes(req.userId)) {
                    const updatedUser = await User.findByIdAndUpdate(
                        req.params.id,
                        {
                            $pull: { followers: req.userId },
                        },
                        { new: true }
                    );
                    const updatedCurrentUser = await User.findByIdAndUpdate(
                        req.userId,
                        {
                            $pull: { followings: req.params.id },
                        },
                        { new: true }
                    );

                    return res.status(200).json({
                        success: true,
                        user: updatedUser,
                        currentUser: updatedCurrentUser,
                        message: "User has been unfollowed",
                    });
                } else {
                    return res.status(403).json({
                        success: false,
                        message: "You don't follow this user",
                    });
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error });
            }
        } else {
            return res.status(403).json({
                success: false,
                message: "You can't unfollow yourself",
            });
        }
    }
    async findUsers(req, res) {
        const { searchQuery } = req.query;
        try {
            const allUsers = await User.find({
                _id: { $nin: [req.userId] },
            }).select("-password");
            const usersByUsername = allUsers.filter((u) =>
                u["username"].toLowerCase().includes(searchQuery)
            );
            const usersByEmail = allUsers.filter((u) =>
                u["email"].toLowerCase().split("@", 1)[0].includes(searchQuery)
            );
            return res
                .status(200)
                .json({ success: true, usersByUsername, usersByEmail });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
}
module.exports = new UserController();
