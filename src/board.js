import config from './config'
import CellFactory from './cell'

let board = []
let highlightedCell = { x: 0, y: 0 }

function init() {
  board = createEmptyBoard(config.BOARD_WIDTH, config.BOARD_HEIGHT)
  board = placeRandomMines(board, config.NUM_MINES)
  board = detectCellsNumbers(board)
  console.log(getBoard())
}

function getBoard() {
  return board.map(row => row.map(cell => cell.getContent()))
}

function getBoardVisual() {
  return board.map(row => row.map(cell => cell.getVisual()))
}

function createEmptyBoard(width, height) {
  return new Array(height).fill(0)
    .map(() => new Array(width).fill(0).map(CellFactory))
}

function placeRandomMines(board, numMines) {
  const newBoard = [...board]
  const mineCoords = getUniqueCoords(numMines, config.BOARD_WIDTH, config.BOARD_HEIGHT, [])
  mineCoords.forEach(coord => newBoard[coord.y][coord.x].placeBomb())
  return newBoard
}

function getUniqueCoords(numCoords, width, height, coords) {
  if (coords.length === numCoords || coords.length === width * height) {
    return coords
  }

  const newCoord = getRandomCoord(width, height)

  if (!coordAlreadyExist(coords, newCoord)) {
    coords.push(newCoord)
  }

  return getUniqueCoords(numCoords, width, height, coords)
}

function getRandomCoord(width, height) {
  return {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
  }
}

function coordAlreadyExist(coords, coord) {
  return coords.some(c => areCoordsEqual(c, coord))
}

function areCoordsEqual(coord1, coord2) {
  return coord1.x === coord2.x && coord1.y === coord2.y
}

function detectCellsNumbers(board) {
  const newBoard = [...board]

  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      if (newBoard[row][col].getContent() === 'o') {
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
          for (let colOffset = -1; colOffset <= 1; colOffset++) {
            if (rowOffset || colOffset) {
              const coord = { x: col + colOffset, y: row + rowOffset }
              if (isCoordInsideBoard(coord)) {
                newBoard[coord.y][coord.x].incrementNearbyBombs()
              }
            }
          }
        }
      }
    }
  }

  return newBoard
}

function isCoordInsideBoard(coord) {
  return coord.x >= 0 &&
         coord.x < board.length &&
         coord.y >= 0 &&
         coord.y < board[0].length
}

function highlightCell(cellCoord) {
  board[highlightedCell.y][highlightedCell.x].setHighlight(false)
  board[cellCoord.y][cellCoord.x].setHighlight(true)
  highlightedCell = cellCoord
}

function turnOffHighlightedCell() {
  board[highlightedCell.y][highlightedCell.x].setHighlight(false)
}

function revealCell(cellCoord) {
  const cell = board[cellCoord.y][cellCoord.x]
  if (cell.getContent() === 'o') {
    // init()
  }

  recursiveReveal(cellCoord)
}

function recursiveReveal(cellCoord) {
  const cell = board[cellCoord.y][cellCoord.x]
  if (cell.isRevealed()) return
  cell.reveal()
  if (cell.getContent() !== '0') return

  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
      if (rowOffset || colOffset) {
        const nearbyCoord = { x: cellCoord.x + colOffset, y: cellCoord.y + rowOffset }
        if (isCoordInsideBoard(nearbyCoord)) {
          recursiveReveal(nearbyCoord)
        }
      }
    }
  }
}

function switchMarked(cellCoord) {
  board[cellCoord.y][cellCoord.x].switchMarked()
}


export default {
  init,
  getBoardVisual,
  highlightCell,
  turnOffHighlightedCell,
  revealCell,
  switchMarked
}
