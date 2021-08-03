import React from 'react'
import { Card as BtpCard } from 'react-bootstrap'

export default function Rating({rating}) {
  console.log(rating.firstName)
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
          <BtpCard.Title>{rating.rating}</BtpCard.Title>
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