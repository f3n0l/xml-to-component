const express = require("express");
const app = express();
const { Server } = require("http");
const server = Server(app);
const path = require("path");
const compression = require("compression");

const parseString = require("xml2js").parseString;
const https = require("https");

app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.json());

/////////////////////////////// fetch xml from assigned URL and send to frontend

app.get("/api/xml", async (request, response) => {
    function xmlToJson(url, callback) {
        const req = https.get(url, function (res) {
            let xml = "";

            res.on("data", function (chunk) {
                xml += chunk;
            });

            res.on("error", function (e) {
                callback(e, null);
            });

            res.on("timeout", function (e) {
                callback(e, null);
            });

            res.on("end", function () {
                parseString(xml, function (err, result) {
                    callback(null, result);
                });
            });
        });
    }
    const url = "https://www.w3schools.com/xml/plant_catalog.xml";
    xmlToJson(url, function (err, data) {
        console.log(data);
        if (err) {
            return console.err(err);
        }
        console.log(data);
        response.json(data);
    });
});

///////////////////////////////

server.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening.");
});
