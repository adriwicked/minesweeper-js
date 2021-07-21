export default function CellFactory() {
  let revealed = false
  let highlighted = false
  let marked = false
  let content = '0'

  function incrementNearbyBombs() {
    if (content !== 'o') {
      let prevContent = parseInt(content)
      prevContent++
      content = prevContent.toString()
    }
  }

  function reveal() {
    revealed = true
    return content
  }

  return {
    isRevealed: () => revealed,
    reveal,
    getContent: () => content,
    // getVisual: () => content,
    getVisual: () => revealed ? content : marked ? 'x' : highlighted ? '*' : '-',
    placeBomb: () => content = 'o',
    switchMarked: () => marked = !marked,
    setHighlight: value => highlighted = value,
    incrementNearbyBombs
  }
}
