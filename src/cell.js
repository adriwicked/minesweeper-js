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

  function getVisual() {
    return revealed 
      ? content
      : marked
        ? 'x'
        : highlighted
          ? '*'
          : '-'
  }

  return {
    isRevealed: () => revealed,
    reveal,
    getContent: () => content,    
    getVisual,
    placeBomb: () => content = 'o',
    switchMarked: () => marked = !marked,
    setHighlight: value => highlighted = value,
    incrementNearbyBombs
  }
}
