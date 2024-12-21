const dotenv = require("dotenv");
dotenv.config()
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./db/db");
const cookieParser = require('cookie-parser')
const userRotes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/users", userRotes);
app.use("/api/captains", captainRoutes);

module.exports = app;