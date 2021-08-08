import React from "react"
import { Card as BtpCard } from "react-bootstrap"
import { smallStars } from "../HelperFunctions"

export default function Review({ review }) {
  function generateStars() {
    switch (review.rating) {
      case 0:
        return smallStars.zero
      case 1:
        return smallStars.one
      case 2:
        return smallStars.two
      case 3:
        return smallStars.three
      case 4:
        return smallStars.four
      default:
        return smallStars.five
    }
  }

  return (
    <>
      <BtpCard
        bg="Secondary"
        text="dark"
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <BtpCard.Header>
          <i className="fas fa-child"></i>{" "}
          <b>
            {review.firstName + " " + review.lastName}
            <br />
            {new Date(review.datePosted).toLocaleString()}
          </b>
        </BtpCard.Header>
        <BtpCard.Body>
          <BtpCard.Title>{generateStars()}</BtpCard.Title>
          <BtpCard.Text>
            {review.comments}
            <br />
            <strong>Difficulty: {review.gameDifficulty}</strong>
            <br />
            <strong>Moves: {review.moves}</strong>
          </BtpCard.Text>
        </BtpCard.Body>
      </BtpCard>
    </>
  )
}
