const express = require("express");
const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
app.use(express.static("public"))

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

io.on("connection", function(socket){
    console.log("a user has connected");

    socket.on("disconnect", () => {
        console.log("a user has disconnected");
    });
});
server.listen(port, console.log("Server listening on port " + port));
