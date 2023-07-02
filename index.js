const express = require("express");
const app = express();
const { Server } = require("http");
const server = Server(app);
const path = require("path");
const compression = require("compression");
// const cookieSession = require("cookie-session");

app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.json());
// const cookieSessionMiddleware = cookieSession({
//     secret: SESSION_SECRET,
//     maxAge: 1000 * 60 * 60 * 24 * 14,
// });
// app.use(cookieSessionMiddleware);

///////////////////////////////

app.get("/api/test", (request, response) => {
    response.json({ message: "dies ist ein api test von server" });
    console.log("you are here");
});

///////////////////////////////

// app.use(express.static(path.join(__dirname, "build")));

// app.get("/", function (req, res) {
//     res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });

// app.get("*", function (req, res) {
//     res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });

server.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening.");
});
