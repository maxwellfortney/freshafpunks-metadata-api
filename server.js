const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const fs = require("fs");

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.send(
        "You have reached the FreshAFPunks metadata API! Query away, crypto trader!"
    );
});

app.get("/api/token/:tokenID", function (req, res) {
    const tokenId = parseInt(req.params.tokenID).toString();

    fs.readFile(`./jsonData/${tokenId}.json`, "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            res.json(err);
            return;
        }
        console.log("File data:", jsonString);
        res.json(JSON.parse(jsonString));
    });
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
