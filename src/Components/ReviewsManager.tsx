import React, { useState } from "react"
import Review from "./Review"
import ReviewsFilter from "./ReviewsFilter"
import { generateStars } from "../Helpers"

type ReviewsManagerProps = {
  reviews: {
    firstName: string
    lastName: string
    rating: number
    comments: string
    gameDifficulty: string
    datePosted: number
    moves: number
  }[]
}

export default function ReviewsManager({ reviews }: ReviewsManagerProps) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const [starsFilter, setStarsFilter] = useState<string | number>("All")

  function calculateAvgRating() {
    const ratingsSum = reviews
      .map((review) => review.rating)
      .reduce((acc, curr) => acc + curr)
    const ratingsAvg = Math.round((ratingsSum / reviews.length) * 2) / 2

    return generateStars("fa-3x")[ratingsAvg as keyof typeof generateStars]
  }

  function handleCheckboxChange(e: { target: { checked: boolean } }) {
    if (e.target.checked) {
      setIsCheckboxChecked(true)
    } else setIsCheckboxChecked(false)
  }

  function handleStarsFilter(e: { target: { value: string | null } }) {
    if (e.target.value === null || e.target.value === "All") {
      setStarsFilter("All")
    } else {
      setStarsFilter(parseInt(e.target.value))
    }
  }

  function renderReviews() {
    if (isCheckboxChecked && starsFilter === "All") {
      return reviews.map((review, idx) => <Review key={idx} review={review} />)
    } else if (isCheckboxChecked && starsFilter !== "All") {
      return reviews
        .filter((review) => review.rating === starsFilter)
        .map((review, idx) => <Review key={idx} review={review} />)
    } else if (!isCheckboxChecked && starsFilter === "All") {
      return reviews
        .map((review, idx) => <Review key={idx} review={review} />)
        .reverse()
    } else if (!isCheckboxChecked && starsFilter !== "All") {
      return reviews
        .filter((review) => review.rating === starsFilter)
        .map((review, idx) => <Review key={idx} review={review} />)
        .reverse()
    }
  }

  return (
    <>
      <h1>
        <b>Reviews</b>
      </h1>
      {
        <ReviewsFilter
          handleCheckboxChange={handleCheckboxChange}
          handleStarsFilter={handleStarsFilter}
        />
      }
      <div className="average-rating">{calculateAvgRating()}</div>
      <div className="reviews-container">{renderReviews()}</div>
    </>
  )
}
