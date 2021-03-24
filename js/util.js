

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  

  function locateMinesRandomly(i, j) {
    var rndRowIdx;
    var rndColIdx;
    var minesCount = 0;
    while (minesCount !== gBoard) {
        rndRowIdx = getRndInteger(0, gBoard.length - 1);
        rndColIdx = getRndInteger(0, gBoard.length - 1);
        if (!gBoard[rndRowIdx][rndColIdx].isMine && rndRowIdx !== i && rndColIdx !== j) {
            gBoard[rndRowIdx][rndColIdx].isMine = true;
            minesCount++;
        }
    }
}