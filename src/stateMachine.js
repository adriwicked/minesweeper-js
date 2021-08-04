import menuInteractor from './interactors/menuInteractor.js'
import boardInteractor from './interactors/boardInteractor.js'

let board

export default {
  state: 'READY',
  transitions: {
    READY: {
      startMenu() {
        menuInteractor.init()
        this.state = 'MENU'
      }
    },
    MENU: {
      startGame() {        
        menuInteractor.finish()
        boardInteractor.init(board)
        this.state = 'GAME'
      }
    },
    GAME: {
      finishGame() {
        menuInteractor.init()
        this.state = 'MENU'
      }
    },
    FINISH: {
      restartGame() {
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
  },
  setBoard(newBoard) {
    board = newBoard
  }
}
