import React, { useState } from 'react'
import { Modal, Button, Form } from "react-bootstrap";

export default function GameStats({moves, isCardOpen, restartGame, fetchRatings}) {
  const [isResultsModalShown, setIsResultsModalShown] = useState(true)
  const [isFormModalShown, setIsFormModalShown] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    rating: '',
    comments: ''
  })
  
  function showModal() {
    return isCardOpen.find(card=>!card) === undefined ? true : false
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setIsResultsModalShown(false)
    fetch('http://localhost:4000/ratings',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        rating: parseInt(form.rating),
        comments: form.comments,
        moves: moves
      })
    }).then(fetchRatings)
    setForm({
      firstName: '',
      lastName: '',
      rating: '',
      comments: ''
    })
  }
  
  
  return (
    <div className='game-stats'>
      <i className="fas fa-retweet" onClick={()=>{restartGame();setIsResultsModalShown(true);setIsFormModalShown(false)}}></i>
      <span><h5>Moves: {Math.floor(moves)}</h5></span>

      {isResultsModalShown && 
        <Modal centered show={isResultsModalShown && showModal()}>
          <Modal.Header closeButton onClick={()=>{setIsResultsModalShown(false);setIsFormModalShown(false)}}>
            <Modal.Title>Congratulations!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You've matched all cards in {Math.floor(moves)} moves!
            <br/><br/>
            Would you like to save your results and rate us?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>{setIsResultsModalShown(false);setIsFormModalShown(false)}}>
              No
            </Button>
            <Button variant="primary" onClick={()=>setIsFormModalShown(true)}>
              Yes
            </Button>
          </Modal.Footer>
          {isFormModalShown &&
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Control required type="text" placeholder="Enter first name" name="firstName" value={form.firstName} onChange={handleChange}/>
              <Form.Control type="text" placeholder="Enter last name" name="lastName" value={form.lastName} onChange={handleChange}/>
              <Form.Group controlId="formSelect">
              <Form.Label>Rate me:</Form.Label>
                <Form.Select required name="rating" onChange={handleChange}>
                    <option value="5">Five</option>
                    <option value="4">Four</option>
                    <option value="3">Three</option>
                    <option value="2">Two</option>
                    <option value="1">One</option>
                    <option value="0">Zero</option>
                  </Form.Select>
            </Form.Group>
              <br/>
              <Form.Control type="text" placeholder="Comments..." name="comments" value={form.comments} onChange={handleChange}/>
              <br/>
              <Modal.Footer>
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>}
        </Modal>}
    </div>
    )
}