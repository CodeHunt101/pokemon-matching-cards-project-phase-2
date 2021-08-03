import React from 'react'
import { Card as BtpCard } from 'react-bootstrap'

export default function Rating({rating}) {
  const solidStar = <i class="fas fa-star"></i>
  const regularStar = <i class="far fa-star"></i>
  function generateStarts() {
    switch (rating.rating) {
      case 0 : return new Array(5).fill(regularStar)
      case 1 : return new Array(1).fill(solidStar).concat(new Array(4).fill(regularStar)) 
      case 2 : return new Array(2).fill(solidStar).concat(new Array(3).fill(regularStar)) 
      case 3 : return new Array(3).fill(solidStar).concat(new Array(2).fill(regularStar)) 
      case 4 : return new Array(4).fill(solidStar).concat(new Array(1).fill(regularStar)) 
      default : return new Array(5).fill(solidStar)
    }
  }

  return (
    <>
      <BtpCard
        bg='Secondary'
        text='dark'
        style={{ width: '18rem' }}
        className="mb-2"
      >
        <BtpCard.Header><i class="fas fa-child"></i>{' '}<b>{rating.firstName + ' ' + rating.lastName}</b></BtpCard.Header>
        <BtpCard.Body>
          <BtpCard.Title>{generateStarts()}</BtpCard.Title>
          <BtpCard.Text>
            {rating.comments} 
            <br/>
            <strong>Moves: {rating.moves}</strong>
          </BtpCard.Text>
        </BtpCard.Body>
      </BtpCard>
    </>
  )
}