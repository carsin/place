var socket = io();
var listenersSet = false;

socket.on("send canvas", (items) => {
    $("#map").html(" ")
    var str;

    for (y = 0; y < items.length; y++) {
        str += "<tr>";
        for (x = 0; x < items[y].length; x++) {
            str += '<td data-colorid="' + items[y][x] + '"></td>';
        }
        str += "</tr>";
    }

    $("#map").append(str);
    if (!listenersSet) {

    }

});

$(document).click((event) => {
    let el = $(event.target);
    let elColor = el.attr("data-colorid");
    if (elColor >= 4) {
        el.attr("data-colorid", 0);
    } else {
        el.attr("data-colorid", parseInt(elColor) + 1);
    }
});

