export default {
  CANVAS_WIDTH: 200,
  CANVAS_HEIGHT: 200,
  CELL_SIZE: 20,
  CELL_SEPARATION: 2,
  BOARD_WIDTH: 8,
  BOARD_HEIGHT: 8,
  NUM_MINES: 10,
  getBoardSize() {
    return (this.CELL_SIZE + this.CELL_SEPARATION) * this.BOARD_WIDTH - this.CELL_SEPARATION
  },
  getTotalCellSize() {
    return this.CELL_SIZE + this.CELL_SEPARATION
  },
  getBoardPosition() {
    let boardWidth = (this.CELL_SIZE + this.CELL_SEPARATION) * this.BOARD_WIDTH
    return {
      x: this.CANVAS_WIDTH / 2 - boardWidth / 2,
      y: this.CANVAS_HEIGHT / 2 - boardWidth / 2
    }
  }
}
