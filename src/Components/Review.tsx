import { Card } from 'react-bootstrap'
import { generateStars } from '../Helpers'

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
    <Card
      bg="Secondary"
      text="dark"
      style={{ width: '18rem' }}
      className="mb-2"
    >
      <Card.Header>
        <i className="fas fa-child"></i>{' '}
        <b>
          {review.firstName + ' ' + review.lastName}
          <br />
          {new Date(review.datePosted).toLocaleString()}
        </b>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          {generateStars()[review.rating as keyof typeof generateStars]}
        </Card.Title>
        <Card.Text>
          {review.comments}
          <br />
          <strong>Difficulty: {review.gameDifficulty}</strong>
          <br />
          <strong>Moves: {review.moves}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
