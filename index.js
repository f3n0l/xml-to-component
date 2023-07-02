const express = require("express");
const app = express();
const { Server } = require("http");
const server = Server(app);
const path = require("path");

///////////////////////////////

app.get("/api/test", (request, response) => {
    response.json({ message: "dies ist ein api test von server" });
    console.log("you are here");
});

///////////////////////////////

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening.");
});
