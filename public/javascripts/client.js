var socket = io();
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

});

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

(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css("cursor", opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass("draggable");
            } else {
                var $drag = $(this).addClass("active-handle").parent().addClass("draggable");
            }
            var z_idx = $drag.css("z-index"),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css("z-index", 1000).parents().on("mousemove", function(e) {
                $(".draggable").offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass("draggable").css("z-index", z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass("draggable");
            } else {
                $(this).removeClass("active-handle").parent().removeClass("draggable");
            }
        });

    }
})(jQuery);

$("#map").drags();
