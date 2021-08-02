import CellFactory from "../src/cell";

test('A cell starts with 0', () => {
    const cell = CellFactory()
    expect(cell.getContent()).toBe('0')
})

test('A bomb can be placed in a cell', () => {
    const cell = CellFactory()
    expect(cell.getContent()).toBe('0')
    cell.placeBomb()
    expect(cell.getContent()).toBe('o')
})

test('Cell content increments with near bombs', () => {
    const cell = CellFactory()
    expect(cell.getContent()).toBe('0')
    cell.incrementNearbyBombs()
    expect(cell.getContent()).toBe('1')
})

test('A cell can be revealed', () => {
    const cell = CellFactory()
    expect(cell.getVisual()).toBe('-')
    cell.reveal()
    expect(cell.getVisual()).toBe('0')
    expect(cell.isRevealed()).toBe(true)
})

test('A cell can be highlighted', () => {
    const cell = CellFactory()
    expect(cell.getVisual()).toBe('-')
    cell.setHighlight(true)
    expect(cell.getVisual()).toBe('*')    
})

test('A cell can be marked as possible bomb', () => {
    const cell = CellFactory()
    expect(cell.getVisual()).toBe('-')
    cell.switchMarked()
    expect(cell.getVisual()).toBe('x')
})