var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var fs = require("fs");

var index = require("./routes/index");

var app = express();
var http = require("http");
var server = http.Server(app);
var io = require("socket.io")(server);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
    next();
});

app.use("/", index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

io.on("connection", function(socket){
    console.log("a user connected");
    fs.readFile("db/canvas.txt", (err, data) => {
        if (err) throw err;
        var data = data.toString();
        var items = data.split(/\r?\n/).map( pair => pair.split(/\s+/).map(Number) );
        items.splice(-1,1)
        io.emit("send canvas", items)
    });

    socket.on("write canvas", (array) => {
        var file = fs.createWriteStream('db/canvas.txt');
        file.on('error', function(err) { /* error handling */ });
        array.forEach(function(v) { file.write(v.join(' ') + '\n'); });
        file.end();
        io.emit("send canvas", array);
    });

    socket.on("disconnect", () => {
        console.log("a user disconnected");
    });
});

module.exports = { app: app, server: server, };
