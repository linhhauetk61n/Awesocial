const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const route = require("./src/index");
const cors = require("cors");
const app = express();
const path = require("path");

//DB
const db = require("./src/config/db/index");
db.connect();

app.use(cors());
app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan("common"));
app.use("/images", express.static(path.join(__dirname, "public/images")));
route(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is  running on port: ${PORT}`));
