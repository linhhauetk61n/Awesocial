const jwt = require("jsonwebtoken");

//Authorization: Bearer asdjasjdhashdasdka
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const token = authHeader && authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Access token is not valid",
                });
            }
            req.userId = user.userId;
            next();
        });
    } else {
        return res
            .status(401)
            .json({ success: false, message: "Access token not found" });
    }
};
module.exports = verifyToken;
