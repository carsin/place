var express = require("express");
var router = express.Router();
var fs = require("fs");
var clients = {};

/* GET home page. */
router.get("/", function(req, res, next) {
    res.io.on("connection", (socket) => {
        console.log("a user has connected");
    });

    res.render("index");
});

module.exports = router;
