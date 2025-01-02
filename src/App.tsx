import { Container } from 'react-bootstrap'
import GameManager from './Components/GameManager'
import Header from './Components/Header'
import Menu from './Components/Menu'
import ReviewsManager from './Components/ReviewsManager'
import Contact from './Components/Contact'
import initialReviews from './InitialReviews'
import { HashRouter, Route, Routes } from 'react-router'

export default async function App() {

  async function fetchReviews(): Promise<{
    firstName: string;
    lastName: string;
    rating: number;
    comments: string;
    gameDifficulty: string;
    moves: number;
    datePosted: number;
}[] | undefined> {
    try {
      const resp = await fetch('http://localhost:4000/reviews')
      const jsonReviews = await resp.json()
      return initialReviews.concat(jsonReviews)
    } catch {
      alert(
        "Welcome and enjoy the Matching Cards Pokemon game! \nIt seems that you've opened the deployed version. Everything will work fine except new reviews won't be posted, and contact form submissions won't be stored in the mock JSON server database.\nTo experience all the features, please clone the repo and run both npm i and npm start."
      )
    }
  }

  const reviews = await fetchReviews()

  return (
    <Container fluid className='px-0 px-md-3'>
      <HashRouter>
      <Menu />
      <Header />
      <Routes>
        <Route path="/" element={<GameManager fetchReviews={fetchReviews} />} />
        <Route path="/reviews" element={<ReviewsManager reviews={reviews || initialReviews} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </HashRouter>
    </Container>
  )
}
