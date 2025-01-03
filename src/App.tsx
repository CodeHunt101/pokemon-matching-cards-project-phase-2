import { Container } from 'react-bootstrap'
import GameManager from './Components/GameManager'
import Header from './Components/Header'
import Menu from './Components/Menu'
import ReviewsManager from './Components/ReviewsManager'
import Contact from './Components/Contact'
import initialReviews from './InitialReviews'
import { HashRouter, Route, Routes } from 'react-router'
import { reviewsApi } from './api/services'

export default async function App() {
  let reviews

  try {
    const response = await reviewsApi.getReviews()
    reviews = response.data
  } catch {
    alert(
      "Welcome and enjoy the Matching Cards Pokemon game! \nIt seems that you've opened the deployed version. Everything will work fine except new reviews won't be posted, and contact form submissions won't be stored in the mock JSON server database.\nTo experience all the features, please clone the repo and run both npm i and npm start."
    )
  }

  return (
    <Container fluid className="px-0 px-md-3">
      <HashRouter>
        <Menu />
        <Header />
        <Routes>
          <Route path="/" element={<GameManager />} />
          <Route
            path="/reviews"
            element={<ReviewsManager reviews={reviews || initialReviews} />}
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </HashRouter>
    </Container>
  )
}
