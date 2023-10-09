import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutFunction = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-bg">
      <Link to="/">
        <img
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      <ul className="header-icons">
        <Link className="special-header" to="/">
          <li className="header-home-icon">Home</li>
        </Link>
        <Link className="special-header" to="/jobs">
          <li>Jobs</li>
        </Link>
        <li>
          <button type="button" onClick={logoutFunction} className="logout-but">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
