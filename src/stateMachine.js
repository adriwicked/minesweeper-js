import menuInteractor from './interactors/menuInteractor'
import boardInteractor from './interactors/boardInteractor'
import board from './board'

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
        board.init()
        menuInteractor.finish()
        boardInteractor.init()
        this.state = 'GAME'
      }
    },
    GAME: {
      finishGame() {
        boardInteractor.finish()
        this.state = 'FINISH'
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
  }
}
