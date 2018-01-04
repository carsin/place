var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.io.on("connection", function(socket) {
        console.log("a user has connected");

        socket.on("disconnect", function() {
            console.log("a user has disconnected");
        });
    });

    res.render("index", { title: "Express" });
});

module.exports = router;
