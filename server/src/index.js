const usersRoute = require("./routes/usersRoute");
const authRoute = require("./routes/authRoute");
const postsRoute = require("./routes/postsRoute");
const uploadFile = require("./routes/uploadFile");
const messageRoute = require("./routes/messageRoute");
const conversationRoute = require("./routes/conversationRoute");
function route(app) {
    app.use("/api/users", usersRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/posts", postsRoute);
    app.use("/api/upload", uploadFile);
    app.use("/api/messages", messageRoute);
    app.use("/api/conversations", conversationRoute);
    app.use("/", (req, res) => res.send("App running."));
}
module.exports = route;
