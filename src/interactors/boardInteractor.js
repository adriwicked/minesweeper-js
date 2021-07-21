import config from '../config'
import input from '../input'
import board from '../board'

let boardPosition

function init() {
  boardPosition = config.getBoardPosition()
  input.subscribeMouseMove(onMouseMove)
  input.subscribeMouseClick(onMouseClick)
  input.subscribeMouseHold(onMouseHold)
}

function onMouseHold(mouseCoord) {
  if (!mouseCoordIsOutOfBoardBounds(mouseCoord)) {
    const cellCoord = mouseCoordToBoardCoord(mouseCoord)
    board.switchMarked(cellCoord)
  }
}

function onMouseClick(mouseCoord) {
  if (!mouseCoordIsOutOfBoardBounds(mouseCoord)) {
    const cellCoord = mouseCoordToBoardCoord(mouseCoord)
    board.revealCell(cellCoord)
  }
}

function onMouseMove(mouseCoord) {
  if (!mouseCoordIsOutOfBoardBounds(mouseCoord)) {
    const cellCoord = mouseCoordToBoardCoord(mouseCoord)
    board.highlightCell(cellCoord)
  } else {
    board.turnOffHighlightedCell()
  }
}

function mouseCoordToBoardCoord(mouseCoord) {
  return {
    x: Math.floor((mouseCoord.x - boardPosition.x) / config.getTotalCellSize()),
    y: Math.floor((mouseCoord.y - boardPosition.y) / config.getTotalCellSize())
  }
}

function mouseCoordIsOutOfBoardBounds(mouseCoord) {
  return mouseCoord.x < boardPosition.x ||
         mouseCoord.x > boardPosition.x + config.getBoardSize() ||
         mouseCoord.y < boardPosition.y ||
         mouseCoord.y > boardPosition.y + config.getBoardSize()
}

export default {
  init
}
