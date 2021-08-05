import config from './config.js'
import input from './input.js'
import BoardFactory from './board.js'
import painter from './painter.js'
import menuInteractor from './interactors/menuInteractor.js'
import boardInteractor from './interactors/boardInteractor.js'

let cnv
let ctx
let board

const stateMachine = {
  state: 'READY',
  transitions: {
    READY: {
      startMenu() {
        menuInteractor.init(this)
        this.state = 'MENU'
      }
    },
    MENU: {
      startGame() {
        menuInteractor.finish()

        board = BoardFactory(config.BOARD_WIDTH, config.BOARD_HEIGHT, config.NUM_MINES)
        boardInteractor.init(board, this)
        this.state = 'GAME'
      }
    },
    GAME: {
      finishGame() {
        boardInteractor.finish()

        menuInteractor.init(this)
        this.state = 'FINISH'
      }
    },
    FINISH: {
      startGame() {
        menuInteractor.finish()

        board = BoardFactory(config.BOARD_WIDTH, config.BOARD_HEIGHT, config.NUM_MINES)
        boardInteractor.init(board, this)
        this.state = 'GAME'
      }
    }
  },
  dispatch(actionName) {
    const action = this.transitions[this.state][actionName]

    if (action) {
      action.call(this);
    } else {
      console.log('invalid action');
    }
  }
}

window.onload = init

function init() {
  cnv = document.getElementById("cnv");
  cnv.width = config.CANVAS_WIDTH
  cnv.height = config.CANVAS_HEIGHT
  ctx = cnv.getContext('2d')

  input.init(cnv)
  painter.init(ctx)
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
      painter.drawFinish(board.getBoardVisual())
      break;

    default:
      break;
  }
  window.requestAnimationFrame(gameLoop)
}

export default {
  init
}
