import config from './config.js'
import input from './input.js'
import BoardFactory from './board.js'
import painter from './painter.js'
import stateMachine from './stateMachine.js'

let cnv
let ctx
let board

window.onload = function() {
  const canvas = document.getElementById("cnv");
  init(canvas)  
};

function init(canvas) {
  cnv = canvas
  cnv.width = config.CANVAS_WIDTH
  cnv.height = config.CANVAS_HEIGHT
  ctx = cnv.getContext('2d')

  board = BoardFactory(config.BOARD_WIDTH, config.BOARD_HEIGHT, config.NUM_MINES)
  input.init(cnv)
  painter.init(ctx)

  start()
}

function start() {
  stateMachine.setBoard(board)
  stateMachine.dispatch('startMenu')
  window.requestAnimationFrame(gameLoop)
}

function gameLoop() {
  switch (stateMachine.state) {
    case 'MENU':
      painter.drawMenu()
      break;

    case 'GAME':
      painter.drawGame(board.getBoardVisual())
      break;

    case 'FINISH':
      break;

    default:
      break;
  }
  window.requestAnimationFrame(gameLoop)
}

export default {
  init
}
