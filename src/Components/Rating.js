import React from 'react'
import { Card as BtpCard } from 'react-bootstrap'
import { smallStars } from '../HelperFunctions'

export default function Rating({rating}) {
  
  


  function generateStartsV2() {
    switch (rating.rating) {
      case 0 : return smallStars.zero
      case 1 : return smallStars.one
      case 2 : return smallStars.two
      case 3 : return smallStars.three
      case 4 : return smallStars.four
      default : return smallStars.five
    }
  }
  
  // function generateStarts() {
  //   const solidStar = <i className="fas fa-star"></i>
  //   const regularStar = <i className="far fa-star"></i>
  //   switch (rating.rating) {
  //     case 0 : return new Array(5).fill(regularStar)
  //     case 1 : return new Array(1).fill(solidStar).concat(new Array(4).fill(regularStar)) 
  //     case 2 : return new Array(2).fill(solidStar).concat(new Array(3).fill(regularStar)) 
  //     case 3 : return new Array(3).fill(solidStar).concat(new Array(2).fill(regularStar)) 
  //     case 4 : return new Array(4).fill(solidStar).concat(new Array(1).fill(regularStar)) 
  //     default : return new Array(5).fill(solidStar)
  //   }
  // }

  return (
    <>
      <BtpCard
        bg='Secondary'
        text='dark'
        style={{ width: '18rem' }}
        className="mb-2"
      >
        <BtpCard.Header><i className="fas fa-child"></i>{' '}<b>{rating.firstName + ' ' + rating.lastName}</b></BtpCard.Header>
        <BtpCard.Body>
          <BtpCard.Title>{generateStartsV2()}</BtpCard.Title>
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