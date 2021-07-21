import config from './config'
import input from './input'
import boardInteractor from './interactors/boardInteractor'
import menuInteractor from './interactors/menuInteractor'
import board from './board'
import painter from './painter'
import stateMachine from './stateMachine'

let cnv, ctx

function init(canvas) {
  cnv = canvas
  cnv.width = config.CANVAS_WIDTH
  cnv.height = config.CANVAS_HEIGHT
  ctx = cnv.getContext('2d')

  input.init(cnv)
  painter.init(ctx)

  start()
}

function start() {
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
