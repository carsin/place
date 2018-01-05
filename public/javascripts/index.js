var socket = io();

socket.on("send canvas", (items) => {
    var str;
    for (y = 0; y < items.length; y++) {
        str += "<tr>";
        for (x = 0; x < items[y].length; x++) {
            str += '<td data-color="' + items[y][x] + '">' + items[y][x] + '</td>';
        }
        str += "</tr>";
    }
    $("#map").append(str);
});
