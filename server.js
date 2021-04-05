const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5001;
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.send(
        "You have reached the FreshAFPunks metadata API! Query away, crypto trader!"
    );
});

let lockedIDs = [];

// for (let i = 0; i < 10000; i++) {
//     lockedIDs.push(i);
// }

app.route("/lockedIDs")
    .get(function (req, res) {
        res.send(JSON.stringify(lockedIDs));
    })
    .post(function (req, res) {
        console.log(req.body);
        if (req.body.length > 0) {
            lockedIDs = [...lockedIDs, ...req.body];
        }
        console.log(lockedIDs);

        setTimeout(() => {
            removeLockedIDs(req.body);
        }, 1000 * 180);
        res.send("Locked IDs");
    });

app.post("/removeLockedIDs", (req, res) => {
    removeLockedIDs(req.body);
    res.send("Removed");
});

function removeLockedIDs(randomIDs) {
    for (let i = 0; i < randomIDs.length; i++) {
        lockedIDs = lockedIDs.filter((item) => {
            return item !== randomIDs[i];
        });
    }

    console.log(lockedIDs);
}

app.get("/api/token/:tokenID", function (req, res) {
    const tokenId = parseInt(req.params.tokenID).toString();

    fs.readFile(`./jsonData/${tokenId}.json`, "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            res.json(err);
            return;
        }
        console.log("File data:", jsonString);
        res.send(JSON.parse(jsonString));
    });
});

app.get("/api/store-metadata", (req, res) => {
    fs.readFile(`./store-metadata.json`, "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            res.json(err);
            return;
        }
        console.log("File data:", jsonString);
        res.send(JSON.parse(jsonString));
    });
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
