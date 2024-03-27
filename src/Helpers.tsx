export default function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function getPokemonIdFromImgUrl(e: any) {
  if (e.target.className === "card") {
    return e.target.firstElementChild.src.replace(/[^0-9]/g, "")
  } else {
    return e.target.src.replace(/[^0-9]/g, "")
  }
}

export function generateStars(className?: string) {
  return {
    0: [...Array(5)].map((item, idx) => (
      <i key={idx} className={`far fa-star ${className}`}></i>
    )),
    0.5: [...Array(1)]
      .map((item, idx) => (
        <i key={idx} className={`fas fa-star-half-alt ${className}`}></i>
      ))
      .concat(
        [...Array(4)].map((item, idx) => (
          <i key={idx + 1} className={`far fa-star ${className}`}></i>
        ))
      ),
    1: [...Array(1)]
      .map((item, idx) => (
        <i key={idx} className={`fas fa-star ${className}`}></i>
      ))
      .concat(
        [...Array(4)].map((item, idx) => (
          <i key={idx + 1} className={`far fa-star ${className}`}></i>
        ))
      ),
    1.5: [...Array(1)]
      .map((item, idx) => (
        <i key={idx} className={`fas fa-star ${className}`}></i>
      ))
      .concat(
        [...Array(1)].map((item, idx) => (
          <i key={idx + 1} className={`fas fa-star-half-alt ${className}`}></i>
        ))
      )
      .concat(
        [...Array(3)].map((item, idx) => (
          <i key={idx + 2} className={`far fa-star ${className}`}></i>
        ))
      ),
    2: [...Array(2)]
      .map((item, idx) => (
        <i key={idx} className={`fas fa-star ${className}`}></i>
      ))
      .concat(
        [...Array(3)].map((item, idx) => (
          <i key={idx + 2} className={`far fa-star ${className}`}></i>
        ))
      ),
    2.5: [...Array(2)]
      .map((item, idx) => (
        <i key={idx} className={`fas fa-star ${className}`}></i>
      ))
      .concat(
        [...Array(1)].map((item, idx) => (
          <i key={idx + 2} className={`fas fa-star-half-alt ${className}`}></i>
        ))
      )
      .concat(
        [...Array(2)].map((item, idx) => (
          <i key={idx + 3} className={`far fa-star ${className}`}></i>
        ))
      ),
    3: [...Array(3)]
      .map((item, idx) => (
        <i key={idx} className={`fas fa-star ${className}`}></i>
      ))
      .concat(
        [...Array(2)].map((item, idx) => (
          <i key={idx + 3} className={`far fa-star ${className}`}></i>
        ))
      ),
    3.5: [...Array(3)]
      .map((item, idx) => (
        <i key={idx} className={`fas fa-star ${className}`}></i>
      ))
      .concat(
        [...Array(1)].map((item, idx) => (
          <i key={idx + 3} className={`fas fa-star-half-alt ${className}`}></i>
        ))
      )
      .concat(
        [...Array(1)].map((item, idx) => (
          <i key={idx + 4} className={`far fa-star ${className}`}></i>
        ))
      ),
    4: [...Array(4)]
      .map((item, idx) => (
        <i key={idx} className={`fas fa-star ${className}`}></i>
      ))
      .concat(
        [...Array(1)].map((item, idx) => (
          <i key={idx + 4} className={`far fa-star ${className}`}></i>
        ))
      ),
    4.5: [...Array(4)]
      .map((item, idx) => (
        <i key={idx} className={`fas fa-star ${className}`}></i>
      ))
      .concat(
        [...Array(1)].map((item, idx) => (
          <i key={idx + 4} className={`fas fa-star-half-alt ${className}`}></i>
        ))
      ),
    5: [...Array(5)].map((item, idx) => (
      <i key={idx} className={`fas fa-star ${className}`}></i>
    )),
  }
}
