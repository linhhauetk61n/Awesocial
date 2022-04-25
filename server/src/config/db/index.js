const mongoose = require("mongoose");
require("dotenv").config();
async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = { connect };
