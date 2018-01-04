var express = require("express");
var router = express.Router();
var fs = require("fs");
var clients = {};

/* GET home page. */
router.get("/", function(req, res, next) {
    res.io.sockets.on("connection", function(socket) {
        fs.readFile("db/canvas.txt", (err, data) => {
            if (err) throw err;
            var data = data.toString();
            var items = data.split(/\r?\n/).map( pair => pair.split(/\s+/).map(Number) );
            console.log(items[1][1]);
            console.log(items);
            res.io.emit("send canvas", items)
        });

        socket.on("disconnect", function() {
            console.log("a user has disconnected");
        });
    });

    res.render("index");
});

module.exports = router;
