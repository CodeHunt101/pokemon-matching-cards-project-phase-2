import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import GameManager from './Components/GameManager'
import Header from './Components/Header'
import Menu from './Components/Menu'
import ReviewsManager from './Components/ReviewsManager'
import Contact from './Components/Contact'
import initialReviews from './InitialReviews'
import { Route, Routes } from 'react-router'

export default function App() {
  const [reviews, setReviews] = useState(initialReviews)

  function fetchReviews() {
    fetch('http://localhost:4000/reviews')
      .then((resp) => resp.json())
      .then((jsonReviews) => {
        setReviews(initialReviews.concat(jsonReviews))
      })
      .catch(() =>
        alert(
          "Welcome and enjoy the Matching Cards Pokemon game! \nIt seems that you've opened the deployed version. Eveything will work fine except new reviews won't be posted, and contact form submissions won't be stored in the mock JSON server database.\nTo experience all the features, please clone the repo and run both npm i and npm start."
        )
      )
  }

  useEffect(() => {
    fetchReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container fluid className='px-0 px-md-3'>
      <Menu />
      <Header />
      <Routes>
        <Route path="/" element={<GameManager fetchReviews={fetchReviews} />} />
        <Route path="/reviews" element={<ReviewsManager reviews={reviews} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Container>
  )
}
