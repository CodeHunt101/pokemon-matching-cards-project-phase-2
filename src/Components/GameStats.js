import React, { useState } from 'react'
import { Modal } from "react-bootstrap";

export default function GameStats({moves, isCardOpen, restartGame}) {
  const [isModalShown, setIsModalShown] = useState(true)
  
  function showModal() {
    return isCardOpen.find(card=>!card) === undefined ? true : false
  }
  
  return(
    <div className='game-stats'>
     <i className="fas fa-retweet" onClick={restartGame}></i>
      <span><h5>Moves: {Math.floor(moves)}</h5></span>
      {isModalShown && 
        <Modal centered show={isModalShown && showModal()}>
          <Modal.Header closeButton onClick={()=>setIsModalShown(false)}>
            <Modal.Title>Congratulations!</Modal.Title>
          </Modal.Header>
          <Modal.Body>You've matched all cards in {Math.floor(moves)} moves!</Modal.Body>
        </Modal>}
    </div>
    )
}