var board = new Array();
var score = 0;

$(document).ready(function() {
    newGame();
});

function newGame() {
    init();
    //随机在两个格子生成数字

}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var cell = $("#cell-" + i + "-" + j);
            cell.css("top", getPosTop(i, j));
            cell.css("left", getPosLeft(i, j));
        }
    }
}

