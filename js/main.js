// alert ('hi')

'use strict'
var gLevel = [
    {
        size: 4,
        mines: 2
    }
]

// Pieces Types
var MINE = '💥';
var NUM1 = '1️';
var NUM2 = '2';
var FLAG = '🏁';

var gGame = {
    isOn: true,
    markedCount: 0,
    mineHits: 0
};
// // The mines Board
var gBoard;
var gCell = {
    isShown: true,
    isMine: false,
    isMark: true
}
var isFirstCell = true;
// document.addEventListener("oncontextmenu", flagCell);







function initGame() {
    gBoard = buildBoard();
    // document.querySelector('.flag').innerHTML = FLAG
    // document.querySelector('.mines').innerHTML = MINE
    renderBoard(gBoard);
    


}

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}
// buildBoard()
function buildBoard() {
    //build the board 4 * 4
    var board = [];
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        for (var j = 0; j < 4; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
        }
    }

    console.log(board);
    return board
}

// function placeMines (cellI, cellJ)
// onclick (cell) = 

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];


            // var tdId = 'cell - (string)' + i + '-' +j
            var tdId = `cell-${i}-${j}`;

            // strHtml += '<td id ="' + tdId + '" onclick = "cellClicked (this)"'
            // + 'class ="    ' + className + '" >' + cell + '</td>'
            strHtml += `<td id="${tdId}" oncontextmenu="flagCell(event, ${[i]}, ${[j]})"
            onclick="cellClicked(this, ${i}, ${j})"> 
            ${cell.isMine && cell.isShown ? MINE : ''}
            ${cell.isMarked ? FLAG : ''}
            ${cell.isShown && !cell.isMine ? countNeighbors(i, j) : ''}
            </td>`
        }
        strHtml += '</tr>';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function countNeighbors(rowId, colId) {

    var cell = gBoard[rowId][colId]
    var neighborsSum = cell.minesAroundCount;

    for (var i = rowId - 1; i <= rowId + 1; i++) {

        if (i < 0 || i >= gBoard.length) continue;

        for (var j = colId - 1; j <= colId + 1; j++) {

            if (j < 0 || j >= gBoard[i].length) continue;

            if (i === rowId && j === colId) continue;

            if (gBoard[i][j].isMine) neighborsSum++


        }
    }
    console.log(neighborsSum);
    return neighborsSum;
}


function cellClicked(elCell, i, j) {
    elCell = gBoard[i][j];

    // if (isFirstCell) {
    //     gInterval = setInterval(setGameTimer, 500);
    //     locateMinesRandomly(i, j);
    //     isFirstCell = false;
    //     renderBoard(gBoard);
    // }
    if (elCell.isShown || elCell.isMarked) { return }
    else { // if cell is not shown or marked - show cell
        elCell.isShown = true;
        if (elCell.isMine) {
            // onMineHit();
        }
        else if (countNeighbor(i, j) === 0) {
            expandOpenCells(i, j);
        }
        // checkGameOver();
    }
    renderBoard(gBoard);
}

function expandOpenCells(rowId, colId) {
    for (var i = rowId - 1; i <= rowId + 1; i++) {
        // if i is out of bounderies - go to the next i 
        if (i < 0 || i > gBoard.length - 1) continue;  //continue to the next i 
        for (var j = colId - 1; j <= colId + 1; j++) {
            // if j is out of bounderies - go to the next j:
            if (j < 0 || j > gBoard[0].length - 1) continue; // continue to the next j.
            if (i === rowId && j === colId) continue;
            cellClicked(gBoard[i][j], i, j);
        }
    }
    renderBoard(gBoard);
}
locateMinesRandomly(0, 3)