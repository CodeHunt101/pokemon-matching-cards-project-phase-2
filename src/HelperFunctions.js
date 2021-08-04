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

export const smallStars = {
  zero: [...Array(5)].map((item,idx)=><i key={idx} className="far fa-star"></i>),
  one: [...Array(1)].map((item,idx)=><i key={idx} className="fas fa-star"></i>)
      .concat([...Array(4)].map((item,idx)=><i key={idx+1} className="far fa-star"></i>)),
  two: [...Array(2)].map((item,idx)=><i key={idx} className="fas fa-star"></i>)
      .concat([...Array(3)].map((item,idx)=><i key={idx+2} className="far fa-star"></i>)),
  three: [...Array(3)].map((item,idx)=><i key={idx} className="fas fa-star"></i>)
      .concat([...Array(2)].map((item,idx)=><i key={idx+3} className="far fa-star"></i>)),
  four: [...Array(4)].map((item,idx)=><i key={idx} className="fas fa-star"></i>)
      .concat([...Array(1)].map((item,idx)=><i key={idx+4} className="far fa-star"></i>)),
  five: [...Array(5)].map((item,idx)=><i key={idx} className="fas fa-star"></i>),
}

export const bigStars = {
  zero: [...Array(5)].map((item,idx)=><i key={idx} className="far fa-star fa-3x"></i>),
  halfToOne: [...Array(1)].map((item,idx)=><i key={idx} className="fas fa-star-half-alt fa-3x"></i>)
    .concat([...Array(4)].map((item,idx)=><i key={idx+1} className="far fa-star fa-3x"></i>)),
  one: [...Array(1)].map((item,idx)=><i key={idx} className="fas fa-star fa-3x"></i>)
    .concat([...Array(4)].map((item,idx)=><i key={idx+1} className="far fa-star fa-3x"></i>)),
  halfToTwo: [...Array(1)].map((item,idx)=><i key={idx} className="fas fa-star fa-3x"></i>)
    .concat([...Array(1)].map((item,idx)=><i key={idx+1} className="fas fa-star-half-alt fa-3x"></i>))
    .concat([...Array(3)].map((item,idx)=><i key={idx+2} className="far fa-star fa-3x"></i>)),
  two: [...Array(2)].map((item,idx)=><i key={idx} className="fas fa-star fa-3x"></i>)
    .concat([...Array(3)].map((item,idx)=><i key={idx+2} className="far fa-star fa-3x"></i>)),
  halfToThree: [...Array(2)].map((item,idx)=><i key={idx} className="fas fa-star fa-3x"></i>)
    .concat([...Array(1)].map((item,idx)=><i key={idx+2} className="fas fa-star-half-alt fa-3x"></i>))
    .concat([...Array(2)].map((item,idx)=><i key={idx+3} className="far fa-star fa-3x"></i>)),
  three: [...Array(3)].map((item,idx)=><i key={idx} className="fas fa-star fa-3x"></i>)
    .concat([...Array(2)].map((item,idx)=><i key={idx+3} className="far fa-star fa-3x"></i>)),
  halfToFour: [...Array(3)].map((item,idx)=><i key={idx} className="fas fa-star fa-3x"></i>)
    .concat([...Array(1)].map((item,idx)=><i key={idx+3} className="fas fa-star-half-alt fa-3x"></i>))
    .concat([...Array(1)].map((item,idx)=><i key={idx+4} className="far fa-star fa-3x"></i>)),
  four: [...Array(4)].map((item,idx)=><i key={idx} className="fas fa-star fa-3x"></i>)
    .concat([...Array(1)].map((item,idx)=><i key={idx+4} className="far fa-star fa-3x"></i>)),
  halfToFive: [...Array(4)].map((item,idx)=><i key={idx} className="fas fa-star fa-3x"></i>)
    .concat([...Array(1)].map((item,idx)=><i key={idx+4} className="fas fa-star-half-alt fa-3x"></i>)),
  five: [...Array(5)].map((item,idx)=><i key={idx} className="fas fa-star fa-3x"></i>),
}