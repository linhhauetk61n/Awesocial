const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthController {
    //resgister
    async register(req, res) {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing username, email or password",
            });
        }
        try {
            //Check for exist user
            const hasUser = await User.findOne({ username });
            const hasEmail = await User.findOne({ email });
            if (hasUser || hasEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Username or Email are already taken",
                });
            }
            //All good
            //Generate new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });
            const savedUser = await newUser.save();
            const { password, ...returnUser } = savedUser._doc;
            const accessToken = jwt.sign(
                { userId: savedUser._id },
                process.env.JWT_SECRET,
                { expiresIn: "3d" }
            );
            return res
                .status(201)
                .json({ success: true, user: { ...returnUser, accessToken } });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }

    //login
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "Missing Email or Password" });
        }
        try {
            //Check for exist user
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect email or password",
                });
            }
            //User found
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect email or password",
                });
            }
            const { password, ...returnUser } = user._doc;
            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "3d" }
            );
            return res
                .status(200)
                .json({ success: true, user: { ...returnUser, accessToken } });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
    //checkLogin
    async checkLogin(req, res) {
        try {
            const user = await User.findById(req.userId).select("-password");
            if (!user) {
                return res
                    .status(400)
                    .json({ success: false, messgae: "User not found" });
            }
            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "3d" }
            );
            return res
                .status(200)
                .json({ success: true, user: { ...user, accessToken } });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error });
        }
    }
}
module.exports = new AuthController();
