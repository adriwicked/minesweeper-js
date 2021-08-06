import BoardFactory from "../src/board";
import config from '../src/config'

test('A board is correctly initialized', () => {
    const board = BoardFactory(
        config.BOARD_WIDTH,
        config.BOARD_HEIGHT,
        config.NUM_MINES
    )

    const boardContent = board.getBoardContent()

    const numCells = boardContent.reduce((acc, curr) => {
        acc += curr.length
        return acc
      }, 0)

    const numBombs = boardContent.reduce((bombs, row) => {
        bombs += row.filter(cell => cell === 'o').length
        return bombs
    }, 0)

    expect(numBombs).toBe(10)
    expect(numCells).toBe(64)
})

test('All board cells start hidden', () => {
    const board = BoardFactory(3, 3, 3)
    expect(board.getBoardVisual()).toEqual(
        [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ]
    )
})

test('A board cell can be revealed', () => {
    const board = BoardFactory(3, 3, 3)
    board.revealCell({ y: 1, x: 1 })
    expect(board.getBoardVisual()).not.toEqual(
        [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ]
    )
})

test('A board cell can be highlighted', () => {
    const board = BoardFactory(3, 3, 3)
    board.highlightCell({ y: 1, x: 1 })
    expect(board.getBoardVisual()).toEqual(
        [
            ['-', '-', '-'],
            ['-', '*', '-'],
            ['-', '-', '-']
        ]
    )
})

test('A board cell can be turned off', () => {
    const board = BoardFactory(3, 3, 3)
    board.highlightCell({ y: 1, x: 1 })
    expect(board.getBoardVisual()).toEqual(
        [
            ['-', '-', '-'],
            ['-', '*', '-'],
            ['-', '-', '-']
        ]
    )
    board.turnOffHighlightedCell({ y: 1, x: 1 })
    expect(board.getBoardVisual()).toEqual(
        [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ]
    )
})

test('A board cell can be marked and unmarked as possible bomb', () => {
    const board = BoardFactory(3, 3, 3)
    board.switchMarked({ y: 0, x: 0 })
    expect(board.getBoardVisual()).toEqual(
        [
            ['x', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ]
    )
    board.switchMarked({ y: 0, x: 0 })
    expect(board.getBoardVisual()).toEqual(
        [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ]
    )
})

test('A board can be created predefined', () => {
    const predefinedBoard = [
        ['-', '-', 'o'],
        ['o', '-', '-'],
        ['-', '-', '-']
    ]
    const board = BoardFactory(3, 3, 0, predefinedBoard)
    
    expect(board.getBoardContent()).toEqual(
        [
            ['1', '2', 'o'],
            ['o', '2', '1'],
            ['1', '1', '0']
        ]
    )
})

test('A board can check if it is resolved', () => {
    const predefinedBoard = [
        ['-', '-', 'o'],
        ['o', '-', '-'],
        ['-', '-', '-']
    ]
    const board = BoardFactory(3, 3, 0, predefinedBoard)
    expect(board.isResolved()).toBe(false)
    
    board.revealCell({ y: 0, x: 0 })
    board.revealCell({ y: 0, x: 1 })
    
    board.revealCell({ y: 1, x: 1 })
    board.revealCell({ y: 1, x: 2 })
    
    board.revealCell({ y: 2, x: 0 })
    board.revealCell({ y: 2, x: 1 })
    board.revealCell({ y: 2, x: 2 })

    expect(board.isResolved()).toBe(true)
})