import input from '../input'
import stateMachine from '../stateMachine'

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
