import { JSX } from 'react'
import { StarsMap } from './types/types'

/**
 * The Fisher-Yates shuffle algorithm. This algorithm works by iterating through the array one element at a time, swapping the current element with a randomly selected element from the current index to the end of the array. This results in a randomly shuffled array.
 * @param array The array to shuffle
 * @returns The shuffled array
 */
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

/**
 * Creates an array of JSX elements representing stars. The elements are
 * `<i>` tags with the given `iconClass` and `className`. The `key` property
 * of each element is set to `startKey + idx`, where `idx` is the index of the
 * element in the array.
 * @param count The number of stars to create
 * @param iconClass The class name for the `<i>` tag representing a star
 * @param className The class name to add to each star element
 * @param startKey The starting number for the `key` property of each element
 * @returns An array of JSX elements representing stars
 */
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

/**
 * Generates a StarsMap, which is an object mapping numbers to arrays of JSX elements representing stars. The keys are the numbers 0 through 5, as well as 0.5, 1.5, 2.5, 3.5, and 4.5. The values are the arrays of JSX elements representing stars. The `className` parameter is added to each element in the arrays.
 * @param className The class name to add to each star element
 * @returns The StarsMap
 */
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
