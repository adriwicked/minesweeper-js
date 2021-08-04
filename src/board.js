import CellFactory from './cell'

export default function BoardFactory(width, height, num_mines) {
  let board = []
  let highlightedCellCoord = { x: 0, y: 0 }
  
  init()

  function init() {
    board = createEmptyBoard(width, height)
    board = placeRandomMines(board, num_mines)
    board = detectCellsNumbers(board)    
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
    const mineCoords = getUniqueCoords(numMines, width, height, [])
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
    return coord.x >= 0
        && coord.x < board.length
        && coord.y >= 0
        && coord.y < board[0].length
  }
  
  function highlightCell(cellCoord) {
    board[highlightedCellCoord.y][highlightedCellCoord.x].setHighlight(false)
    board[cellCoord.y][cellCoord.x].setHighlight(true)
    highlightedCellCoord = cellCoord
  }
  
  function turnOffHighlightedCell() {
    board[highlightedCellCoord.y][highlightedCellCoord.x].setHighlight(false)
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
  
  function countCells() {
    return board.reduce((acc, curr) => {
      acc += curr.length
      return acc
    }, 0)
  }
  
  function countBombs() {
    return board.reduce((bombs, row) => {
      bombs += row.filter(cell => cell.getContent() === 'o').length
      return bombs
    }, 0)
  }

  return {    
    getBoardVisual,
    highlightCell,
    turnOffHighlightedCell,
    revealCell,
    switchMarked,
    countCells,
    countBombs
  }
}
