import { ChangeEvent, FormEvent, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { reviewsApi } from '../api/services'
import { Review } from '../types/types'

type GameControlProps = {
  moves: number
  isCardOpen: boolean[]
  restartGame: () => void
  handleGameDifficulty: (event: ChangeEvent<HTMLInputElement>) => void
  deckSize: number
}

export default function GameControl({
  moves,
  isCardOpen,
  restartGame,
  handleGameDifficulty,
  deckSize,
}: GameControlProps) {
  const [isResultsModalReady, setIsResultsModalReady] = useState(true)
  const [isFormModalShown, setIsFormModalShown] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    rating: '',
    comments: '',
  })

  function showModal() {
    return isCardOpen.find((card) => !card) === undefined
  }

  function handleFormInfo(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const target = e.target
    setForm({
      ...form,
      [target.name]: target.value,
    })
  }

  const handleSubmitReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsResultsModalReady(false)
    const getDifficultyLevel = (): string => {
      const difficultyMap: Record<number, string> = {
        10: 'Easy',
        20: 'Medium',
        30: 'Hard',
      }
      return difficultyMap[deckSize] || 'Medium'
    }

    try {
      const reviewData: Omit<Review, 'datePosted'> = {
        firstName: form.firstName,
        lastName: form.lastName,
        rating: parseInt(form.rating),
        comments: form.comments,
        gameDifficulty: getDifficultyLevel(),
        moves: Math.floor(moves / 2),
      }

      const response = await reviewsApi.createReview(reviewData)

      if (response.error) {
        console.error('Failed to submit review')
        return
      }

      await reviewsApi.getReviews()
    } catch (error) {
      console.error('Error:', error)
    }

    setForm({
      firstName: '',
      lastName: '',
      rating: '',
      comments: '',
    })
  }

  return (
    <div className="game-stats">
      <span
        onClick={() => {
          restartGame()
          setIsResultsModalReady(true)
          setIsFormModalShown(false)
        }}
      >
        <i className="fas fa-retweet fa-2x"></i>
      </span>

      <div
        className="difficulty-level"
        onChange={(_e) => {
          setIsResultsModalReady(true)
        }}
      >
        <Form.Check
          inline
          name="difficulty"
          type="radio"
          label="Easy"
          value="easy"
          onChange={handleGameDifficulty}
        />
        <Form.Check
          inline
          name="difficulty"
          type="radio"
          label="Medium"
          value="medium"
          defaultChecked
          onChange={handleGameDifficulty}
        />
        <Form.Check
          inline
          name="difficulty"
          type="radio"
          label="Hard"
          value="hard"
          onChange={handleGameDifficulty}
        />
      </div>

      <span className="moves">Moves: {Math.floor(moves / 2)}</span>

      {isResultsModalReady && (
        <Modal centered show={showModal()}>
          <Modal.Header
            closeButton
            onClick={() => {
              setIsResultsModalReady(false)
              setIsFormModalShown(false)
            }}
          >
            <Modal.Title>Congratulations!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You've matched all cards in {Math.floor(moves)} moves!
            <br />
            <br />
            Would you like to save your results and rate us?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setIsResultsModalReady(false)
                setIsFormModalShown(false)
              }}
            >
              No
            </Button>
            <Button variant="primary" onClick={() => setIsFormModalShown(true)}>
              Yes
            </Button>
          </Modal.Footer>
          {isFormModalShown && (
            <Modal.Body>
              <Form onSubmit={handleSubmitReview}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleFormInfo}
                />
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleFormInfo}
                />
                <Form.Group controlId="formSelect">
                  <Form.Label>Rate me:</Form.Label>
                  <Form.Select required name="rating" onChange={handleFormInfo}>
                    <option value="5">Five</option>
                    <option value="4">Four</option>
                    <option value="3">Three</option>
                    <option value="2">Two</option>
                    <option value="1">One</option>
                    <option value="0">Zero</option>
                  </Form.Select>
                </Form.Group>
                <br />
                <Form.Control
                  type="text"
                  placeholder="Comments..."
                  name="comments"
                  value={form.comments}
                  onChange={handleFormInfo}
                />
                <br />
                <Modal.Footer>
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          )}
        </Modal>
      )}
    </div>
  )
}
