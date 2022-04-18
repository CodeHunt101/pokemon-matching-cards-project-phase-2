import { Card as BtpCard } from "react-bootstrap"
import { generateStars } from "../Helpers"

type ReviewProps = {
  review: {
    firstName: string
    lastName: string
    rating: number
    comments: string
    gameDifficulty: string
    datePosted: number
    moves: number
  }
}

export default function Review({ review }: ReviewProps) {
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
          <BtpCard.Title>{generateStars()[review.rating as keyof typeof generateStars]}</BtpCard.Title>
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
