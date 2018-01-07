var socket = io();
var listenersSet = false;
var mapArr;

socket.on("send canvas", (items) => {
    $("#map").html(" ")
    var str;
    mapArr = items;

    for (y = 0; y < items.length; y++) {
        str += "<tr>";
        for (x = 0; x < items[y].length; x++) {
            str += '<td data-x="' + x + '" data-y="' + y + '" data-colorid="' + items[y][x] + '"></td>';
        }
        str += "</tr>";
    }

    $("#map").append(str);
    if (!listenersSet) {
        $(document).click((event) => {
            let el = $(event.target);
            let elColor = el.attr("data-colorid");
            let elX = el.attr("data-x");
            let elY = el.attr("data-y");
            if (elColor >= 4) {
                el.attr("data-colorid", 0);
                mapArr[elY][elX] = 0;
            } else {
                let newColorId = parseInt(elColor) + 1;
                el.attr("data-colorid", newColorId);
                mapArr[elY][elX] = newColorId;
            }

            socket.emit("write canvas", mapArr);
        });
        listenersSet = true;
    }

});


