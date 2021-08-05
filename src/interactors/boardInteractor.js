import config from '../config.js'
import input from '../input.js'

let stateMachine
let board
let boardPosition

function init(newBoard, newStateMachine) {
  stateMachine = newStateMachine
  board = newBoard  
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
    const cellContent = board.revealCell(cellCoord)
    if (cellContent === 'o') {
      stateMachine.dispatch('finishGame')
    }    
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

function finish() {
  input.unsubscribeMouseMove(onMouseMove)
  input.unsubscribeMouseClick(onMouseClick)
  input.unsubscribeMouseHold(onMouseHold)
}

export default {
  init,
  finish
}
