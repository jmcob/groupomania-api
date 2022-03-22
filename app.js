const express = require("express");
const helmet = require("helmet");

const cors = require("cors");
const app = express();
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const likeRoutes = require("./routes/like.routes");
const dotenv = require("dotenv").config();
const { v4 } = require("uuid");
const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize(
    "groupodb",
    process.env.DB_USER,
    process.env.DB_PWD,
    {
        host: "localhost",
        dialect: "mysql",
    }
);
async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
connect();

app.get("/api", (req, res) => {
    const path = `/api/item/${v4()}`;
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};

app.use(cors({ corsOptions }));

app.use(helmet());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);

module.exports = app;
