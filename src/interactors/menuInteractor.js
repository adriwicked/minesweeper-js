import input from '../input.js'
import stateMachine from '../stateMachine.js'

function init() {
  input.subscribeMouseClick(onMouseClick)
}

function onMouseClick() {
  stateMachine.dispatch('startGame')
}

function finish() {
  input.unsubscribeMouseClick(onMouseClick)
}

export default {
  init,
  finish
}
