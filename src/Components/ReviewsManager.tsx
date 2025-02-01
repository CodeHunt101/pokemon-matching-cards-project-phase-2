import { ChangeEvent, useState } from 'react'
import Review from './Review'
import ReviewsFilter from './ReviewsFilter'
import { StarsMap } from '../types/types'
import { generateStars } from '../Helpers'

type ReviewType = {
  firstName: string
  lastName: string
  rating: number
  comments: string
  gameDifficulty: string
  datePosted: number
  moves: number
}

type ReviewsManagerProps = {
  reviews: ReviewType[]
}

export default function ReviewsManager({ reviews }: ReviewsManagerProps) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const [starsFilter, setStarsFilter] = useState<string | number>('All')

  function calculateAvgRating() {
    const ratingsSum = reviews
      .map((review) => review.rating)
      .reduce((acc, curr) => acc + curr, 0)
    const ratingsAvg = Math.round((ratingsSum / reviews.length) * 2) / 2
    const starsMap: StarsMap = generateStars('fa-3x')
    return starsMap[ratingsAvg as keyof StarsMap]
  }

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    setIsCheckboxChecked(e.target.checked)
  }

  function handleStarsFilter(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    setStarsFilter(value === 'All' ? 'All' : parseInt(value, 10))
  }

  function renderReviews() {
    let filteredReviews = reviews
    if (starsFilter !== 'All') {
      filteredReviews = filteredReviews.filter(
        (review) => review.rating === starsFilter
      )
    }
    if (!isCheckboxChecked) {
      filteredReviews = [...filteredReviews].reverse()
    }
    return filteredReviews.map((review) => (
      <Review key={review.datePosted} review={review} />
    ))
  }

  const renderedReviews = renderReviews()

  return (
    <div className="reviews-manager px-3">
      <h1>
        <b>Reviews</b>
      </h1>
      <ReviewsFilter
        handleCheckboxChange={handleCheckboxChange}
        handleStarsFilter={handleStarsFilter}
      />
      <div className="average-rating">{calculateAvgRating()}</div>
      <div className="reviews-container">
        {renderedReviews.length > 0 ? (
          renderedReviews
        ) : (
          <h2>No reviews found</h2>
        )}
      </div>
    </div>
  )
}
