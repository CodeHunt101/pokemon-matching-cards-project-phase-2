import React from 'react'
import Rating from './Rating'

export default function RatingsContainer({ratings}) {

  
  return(
    <div className="ratings-container">
      {ratings.map(rating => <Rating key={rating.id} rating={rating}/>)}
    </div>
  )
}