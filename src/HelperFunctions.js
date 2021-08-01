export default function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

export function getPokemonIdFromImgUrl(e) {
  if (e.target.className === 'card') {
    return e.target.firstElementChild.src.replace(/[^0-9]/g, '')
  } else {
    return e.target.src.replace(/[^0-9]/g, '')
  }
}

