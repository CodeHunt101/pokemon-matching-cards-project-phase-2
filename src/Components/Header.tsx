import { Badge } from 'react-bootstrap'

export default function Header() {
  return (
    <header className="header">
      <a id={'contact-me'} href="mailto:haroldtm55@gmail.com">
        <b>Contact the Developer</b>
      </a>
      <div className="logo">
        <img
          src={process.env.PUBLIC_URL + '/pokemon-logo.svg'}
          alt="The international Pokemon logo"
          width="269.47"
          height="98.81"
          loading="eager"
          fetchPriority="high"
        ></img>
      </div>

      <h1>
        <Badge className="m-3" bg="primary">
          <small>Matching Cards</small>
        </Badge>
      </h1>
    </header>
  )
}
