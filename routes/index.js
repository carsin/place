var express = require("express");
var router = express.Router();
var fs = require("fs");
var clients = {};

/* GET home page. */
router.get("/", function(req, res, next) {
    res.io.sockets.on("connection", function(socket) {

        socket.on("disconnect", function() {
            console.log("a user has disconnected");
        });
    });

    res.render("index");
});

module.exports = router;
