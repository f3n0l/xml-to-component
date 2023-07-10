const express = require("express");
const app = express();
const { Server } = require("http");
const server = Server(app);
const path = require("path");
const compression = require("compression");

var parseString = require("xml2js").parseString;
var https = require("https");

app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.json());

/////////////////////////////// Change URL Below


app.get("/api/xml", async (request, response) => {
    function xmlToJson(url, callback) {
        var req = https.get(url, function (res) {
            var xml = "";

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

    // Change ending of url according to the date needed:
    var url = "https://freilichtbuehne-freudenberg-tickets.de/cbn/cbn.php?document=spielplxml&von=01.01.2023&bis=31.12.2023";
    xmlToJson(url, function (err, data) {
        console.log(data.spielplan.vst);
        if (err) {
            return console.err(err);
        }
        
        response.json(data.spielplan);
    });
});


///////////////////////////////

server.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening.");
});
