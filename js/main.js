var board = new Array();
var score = 0;

$(document).ready(function() {
    newGame();
});

function newGame() {
    init();
    //随机在两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var cell = $("#cell-" + i + "-" + j);
            cell.css("top", getPosTop(i, j));
            cell.css("left", getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    updateBoardView();
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#container").append('<div class="number-cell" id="numberCell-' + i + '-' + j + '"><div>');
            var numberCell = $("#numberCell-" + i + "-" + j);

            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);       
            } else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));  
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
        }
    }
}

function generateOneNumber() {
    if (noSpace(board)) {
        return false;
    } else {
        //随机一个位置
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));

        while (true) {
            if (board[randx][randy] == 0) {
                break;
            } else {
                randx = parseInt(Math.floor(Math.random() * 4));
                randy = parseInt(Math.floor(Math.random() * 4));
            }
        }
        //随机一个数字
        var randNumber = Math.random() < 0.5 ? 2 : 4;
        board[randx][randy] = randNumber;
        //显示
        showNumberAnimation(randx, randy, randNumber);
        return true;
    }
}
