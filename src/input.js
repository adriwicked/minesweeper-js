let canvas
let mouseMoveObservers = []
let mouseClickObservers = []
let mouseHoldObservers = []
const holdDuration = 300
let leftClickDown = false
let holdFinished = false

function init(newCanvas) {
  canvas = newCanvas
  canvas.addEventListener('mousemove', notifyNewMousePosition)
  canvas.addEventListener('mousedown', checkHoldClick)
  canvas.addEventListener('mouseup', notifyMouseClick)
}

function subscribeMouseMove(fn) {
  mouseMoveObservers.push(fn)
}

function unsubscribeMouseMove(fn) {
  mouseMoveObservers = mouseMoveObservers.filter(obs => obs !== fn)
}

function subscribeMouseClick(fn) {
  mouseClickObservers.push(fn)
}

function unsubscribeMouseClick(fn) {
  mouseClickObservers = mouseClickObservers.filter(obs => obs !== fn)
}

function subscribeMouseHold(fn) {
  mouseHoldObservers.push(fn)
}

function unsubscribeMouseHold(fn) {
  mouseHoldObservers = mouseHoldObservers.filter(obs => obs !== fn)
}

function notifyNewMousePosition(e) {
  const canvasCoords = getCanvasCoords(e)
  mouseMoveObservers.forEach(fn => fn(canvasCoords))
}

function checkHoldClick(e) {
  leftClickDown = true;

  setTimeout(function() {
    if(leftClickDown) {
      notifyMouseHold(e)
    }
  }, holdDuration);
}

function notifyMouseHold(e) {
  console.log('HODL!')
  holdFinished = true
  const canvasCoords = getCanvasCoords(e)
  mouseHoldObservers.forEach(fn => fn(canvasCoords))
}

function notifyMouseClick(e) {
  leftClickDown = false

  if (holdFinished) {
    holdFinished = false
  } else {
    const canvasCoords = getCanvasCoords(e)
    mouseClickObservers.forEach(fn => fn(canvasCoords))
  }
}

function getCanvasCoords(e) {
  const canvasRect = canvas.getBoundingClientRect();
  const xInsideCanvas = Math.round(e.clientX - canvasRect.left)
  const yInsideCanvas = Math.round(e.clientY - canvasRect.top)
  return {
    x: xInsideCanvas,
    y: yInsideCanvas
  }
}

export default {
  init,
  subscribeMouseMove,
  unsubscribeMouseMove,
  subscribeMouseClick,
  subscribeMouseHold,
  unsubscribeMouseHold,
  unsubscribeMouseClick
}
