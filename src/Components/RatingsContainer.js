import React from 'react'
import Rating from './Rating'

export default function RatingsContainer({ratings}) {
  function calculateAvgRating() {
    const ratingsSum = ratings.map(rating => rating.rating).reduce((acc, curr) => acc+curr)
    const ratingsAvg = Math.round(ratingsSum/ratings.length*2)/2
    const solidStar = <i class="fas fa-star fa-3x"></i>
    const regularStar = <i class="far fa-star fa-3x"></i>
    const halfStar = <i class="fas fa-star-half-alt fa-3x"></i>
    
    switch (ratingsAvg) {
      case 0 : return new Array(5).fill(regularStar)
      case 0.5 : return new Array(1).fill(halfStar).concat(new Array(4).fill(regularStar)) 
      case 1 : return new Array(1).fill(solidStar).concat(new Array(4).fill(regularStar)) 
      case 1.5 : return new Array(1).fill(solidStar).concat(new Array(1).fill(halfStar)).concat(new Array(3).fill(regularStar))
      case 2 : return new Array(2).fill(solidStar).concat(new Array(3).fill(regularStar)) 
      case 2.5 : return new Array(2).fill(solidStar).concat(new Array(1).fill(halfStar)).concat(new Array(2).fill(regularStar))
      case 3 : return new Array(3).fill(solidStar).concat(new Array(2).fill(regularStar)) 
      case 3.5 : return new Array(3).fill(solidStar).concat(new Array(1).fill(halfStar)).concat(new Array(1).fill(regularStar))
      case 4 : return new Array(4).fill(solidStar).concat(new Array(1).fill(regularStar)) 
      case 4.5 : return new Array(4).fill(solidStar).concat(new Array(1).fill(halfStar))
      default : return new Array(5).fill(solidStar)
    }
  }
  
  return (
    <>
      <div className="average-rating">
        {calculateAvgRating()}
      </div>
      <div className="ratings-container">
        {ratings.map(rating => <Rating key={rating.id} rating={rating}/>)}
      </div>
    </>
  )
}