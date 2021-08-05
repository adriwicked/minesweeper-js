import input from '../input.js'

let stateMachine

function init(newStateMachine) {
  stateMachine = newStateMachine
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
