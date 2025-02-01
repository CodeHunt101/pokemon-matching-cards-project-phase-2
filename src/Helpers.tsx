import { JSX } from 'react'
import { StarsMap } from './types/types'

export default function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function getPokemonIdFromImgUrl(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) {
  const target = e.target as HTMLElement

  if (target.className === 'card') {
    return Number((target.firstElementChild as HTMLImageElement).src.replace(/[^0-9]/g, ''))
  } else {
    return Number((target as HTMLImageElement).src.replace(/[^0-9]/g, ''))
  }
}

function createStars(
  count: number,
  iconClass: string,
  className: string,
  startKey: number = 0
): JSX.Element[] {
  return [...Array(count)].map((_, idx) => (
    <i key={startKey + idx} className={`${iconClass} ${className}`.trim()}></i>
  ))
}

export function generateStars(className: string = ''): StarsMap {
  return {
    0: createStars(5, 'far fa-star', className),
    0.5: [
      ...createStars(1, 'fas fa-star-half-alt', className),
      ...createStars(4, 'far fa-star', className, 1),
    ],
    1: [
      ...createStars(1, 'fas fa-star', className),
      ...createStars(4, 'far fa-star', className, 1),
    ],
    1.5: [
      ...createStars(1, 'fas fa-star', className),
      ...createStars(1, 'fas fa-star-half-alt', className, 1),
      ...createStars(3, 'far fa-star', className, 2),
    ],
    2: [
      ...createStars(2, 'fas fa-star', className),
      ...createStars(3, 'far fa-star', className, 2),
    ],
    2.5: [
      ...createStars(2, 'fas fa-star', className),
      ...createStars(1, 'fas fa-star-half-alt', className, 2),
      ...createStars(2, 'far fa-star', className, 3),
    ],
    3: [
      ...createStars(3, 'fas fa-star', className),
      ...createStars(2, 'far fa-star', className, 3),
    ],
    3.5: [
      ...createStars(3, 'fas fa-star', className),
      ...createStars(1, 'fas fa-star-half-alt', className, 3),
      ...createStars(1, 'far fa-star', className, 4),
    ],
    4: [
      ...createStars(4, 'fas fa-star', className),
      ...createStars(1, 'far fa-star', className, 4),
    ],
    4.5: [
      ...createStars(4, 'fas fa-star', className),
      ...createStars(1, 'fas fa-star-half-alt', className, 4),
    ],
    5: createStars(5, 'fas fa-star', className),
  }
}
