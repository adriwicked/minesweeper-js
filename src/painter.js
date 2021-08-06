import config from './config.js'

let ctx
let boardPosition = { x: 0, y: 0 }
let colors = {
  background: '#661039',
  unrevealed: '#ab658f',
  highlighted: '#d192b8',
  empty:'#875172'
}

function init(newCtx) {
  ctx = newCtx
  boardPosition = config.getBoardPosition()
}

function clearCanvas() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawMenu() {
  clearCanvas()
  drawBackground()
  drawTitle()
  drawHowToPlay()
  drawMenuBomb()
}

function drawLost(board) {
  clearCanvas()
  drawBackground()
  drawBoard(board)
  drawBackgroundTransparency()
  drawBoom()
}

function drawWon(board) {
  clearCanvas()
  drawBackground()
  drawBoard(board)
  drawBackgroundTransparency()
  drawYouWon()
}

function drawBoom() {
  const titlePos = {
    x: config.CANVAS_WIDTH / 2,
    y: config.CANVAS_HEIGHT / 2
  }

  ctx.fillStyle = colors.highlighted
  ctx.font = "bold 24px Courier New";
  ctx.textBaseline = 'middle';
  ctx.textAlign = "center";
  ctx.fillText('BOOM!', titlePos.x, titlePos.y);
}

function drawYouWon() {
  const titlePos = {
    x: config.CANVAS_WIDTH / 2,
    y: config.CANVAS_HEIGHT / 2
  }

  ctx.fillStyle = colors.highlighted
  ctx.font = "bold 24px Courier New";
  ctx.textBaseline = 'middle';
  ctx.textAlign = "center";
  ctx.fillText('YOU WON!', titlePos.x, titlePos.y);
}

function drawTitle() {
  const titlePos = {
    x: config.CANVAS_WIDTH / 2,
    y: config.CANVAS_HEIGHT / 2.8
  }

  ctx.fillStyle = colors.highlighted
  ctx.font = "bold 24px Courier New";
  ctx.textBaseline = 'middle';
  ctx.textAlign = "center";
  ctx.fillText('MINESWEEPER', titlePos.x, titlePos.y);
}

function drawHowToPlay() {
  const revealPos = {
    x: config.CANVAS_WIDTH / 2,
    y: config.CANVAS_HEIGHT / 1.6
  }
  const markPos = {
    x: config.CANVAS_WIDTH / 2,
    y: config.CANVAS_HEIGHT / 1.4
  }

  ctx.fillStyle = colors.highlighted
  ctx.font = "bold 14px Courier New";
  ctx.textBaseline = 'middle';
  ctx.textAlign = "center";
  ctx.fillText('click to reveal', revealPos.x, revealPos.y);
  ctx.fillText('hold to mark', markPos.x, markPos.y);
}

function drawMenuBomb() {
  const bombPos = {
    x: config.CANVAS_WIDTH / 2,
    y: config.CANVAS_HEIGHT / 2
  }

  ctx.beginPath();
  ctx.fillStyle = colors.highlighted
  ctx.arc(bombPos.x, bombPos.y, 6, 0, 2 * Math.PI);
  ctx.fill();
}

function drawGame(board) {
  clearCanvas()
  drawBackground()
  drawBoard(board)
}

function drawBackground() {
  ctx.fillStyle = colors.background
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawBackgroundTransparency() {
  ctx.fillStyle = 'rgba(102, 16, 57, 0.5)'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawBoard(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      const cellCoord = { x: col, y: row }
      const cellVisual = board[cellCoord.y][cellCoord.x]

      switch (cellVisual) {
        case '-':
          drawCellBackground(cellCoord, colors.unrevealed)
          break;

        case '*':
          drawCellBackground(cellCoord, colors.highlighted)
          break;

        case 'x':
          drawCellBackground(cellCoord, colors.unrevealed)
          drawMark(cellCoord)
          break;

        case 'o':
          drawCellBackground(cellCoord, colors.highlighted)
          drawBomb(cellCoord)
          break;

        case '0':
          drawCellBackground(cellCoord, colors.empty)
          break;

        default:
          drawCellBackground(cellCoord, colors.unrevealed)
          drawCellVisual(cellCoord, cellVisual)
          break;
      }
    }
  }
}

function drawCellBackground(cellCoord, color) {
  const cellRect = {
    x: boardPosition.x + (config.CELL_SIZE + config.CELL_SEPARATION) * cellCoord.x,
    y: boardPosition.y + (config.CELL_SIZE + config.CELL_SEPARATION) * cellCoord.y,
    width: config.CELL_SIZE,
    height: config.CELL_SIZE
  }

  ctx.beginPath()
  ctx.fillStyle = color
  ctx.fillRect(cellRect.x, cellRect.y, cellRect.width, cellRect.height)
  ctx.closePath()
}

function drawCellVisual(cellCoord, cellVisual) {
  const numberCoord = {
    x: boardPosition.x + (config.CELL_SIZE + config.CELL_SEPARATION) * cellCoord.x + config.CELL_SIZE / 2,
    y: boardPosition.y + (config.CELL_SIZE + config.CELL_SEPARATION) * cellCoord.y + config.CELL_SIZE / 1.7
  }

  ctx.fillStyle = colors.background
  ctx.font = "bold 16px Courier New";
  ctx.textBaseline = 'middle';
  ctx.textAlign = "center";
  ctx.fillText(cellVisual, numberCoord.x, numberCoord.y);
}

function drawBomb(cellCoord) {
  const numberCoord = {
    x: boardPosition.x + (config.CELL_SIZE + config.CELL_SEPARATION) * cellCoord.x + config.CELL_SIZE / 2,
    y: boardPosition.y + (config.CELL_SIZE + config.CELL_SEPARATION) * cellCoord.y + config.CELL_SIZE / 2
  }

  ctx.beginPath();
  ctx.fillStyle = colors.background
  ctx.arc(numberCoord.x, numberCoord.y, 6, 0, 2 * Math.PI);
  ctx.fill();
}

function drawMark(cellCoord) {
  const numberCoord = {
    x: boardPosition.x + (config.CELL_SIZE + config.CELL_SEPARATION) * cellCoord.x + config.CELL_SIZE / 2,
    y: boardPosition.y + (config.CELL_SIZE + config.CELL_SEPARATION) * cellCoord.y + config.CELL_SIZE / 2
  }

  ctx.beginPath();
  ctx.strokeStyle = colors.background
  ctx.arc(numberCoord.x, numberCoord.y, 6, 0, 2 * Math.PI);
  ctx.stroke();
}

export default {
  init,
  clearCanvas,
  drawMenu,
  drawGame,
  drawLost,
  drawWon
}
