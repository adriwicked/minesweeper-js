import BoardFactory from "../src/board";
import config from '../src/config'

test('A board is correctly initialized', () => {
    const board = BoardFactory(
        config.BOARD_WIDTH,
        config.BOARD_HEIGHT,
        config.NUM_MINES
    )

    expect(board.countBombs()).toBe(10)
    expect(board.countCells()).toBe(64)
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