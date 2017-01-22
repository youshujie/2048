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

$(document).keydown(function (evnet) {
    switch (event.keyCode) {
        case 37://left
            if (moveLeft()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 38://up
            if (moveTop()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 39://right
            if (moveRight()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 40://down
            if (moveDown()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        default:
            break;           
    }
});

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    } else {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j]) {
                    for (var k = 0; k < j; k++) {
                        if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                            //move
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                            //move
                            showMoveAnimation(i, j, i, k);
                            //add
                            //board[i][k] += board[i][j];
                            board[i][k] *= 2;
                            board[i][j] = 0;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("updateBoardView()", 200);
        return true;
    }
}

function moveRight() {
    if(!canMoveRight(board)) {
        return false;
    } else {
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= 0; j--) {
                if (board[i][j]) {
                    for (var k = 3; k > j; k--) {
                        if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                            showMoveAnimation(i, j, i, k);
                            board[i][k] *= 2;
                            board[i][j] = 0;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("updateBoardView()", 200);
        return true;
    }
}

function moveTop() {
    if(!canMoveTop(board)) {
        return false;
    } else {
        for (var j = 0; j < 4; j++) {
            for (var i = 1; i < 4; i++) {
                if (board[i][j]) {
                    for (var k = 0; k < i; k++) {
                        if (board[k][j] == 0 && noBlockVertical(k, i, j, board)) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[k][j] == board[i][j] && noBlockVertical(k, i, j, board)) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] *= 2;
                            board[i][j] = 0;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("updateBoardView()", 200);
        return true;
    }
}

function moveDown() {
    if(!canMoveDown(board)) {
        return false;
    } else {
        for (var j = 0; j < 4; j++) {
            for (var i = 2; i >= 0; i--) {
                if (board[i][j]) {
                    for (var k = 3; k > i; k--) {
                        if (board[k][j] == 0 && noBlockVertical(i, k, j, board)) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[k][j] == board[i][j] && noBlockVertical(i, k, j, board)) {
                            showMoveAnimation(i, j, k, j);
                            board[k][j] *= 2;
                            board[i][j] = 0;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("updateBoardView()", 200);
        return true;
    }
}

function isGameOver() {

}

