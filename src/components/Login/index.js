import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
// import { body } from 'msw/lib/types/context'

class Login extends Component {
  state = {isMatched: false, username: '', password: '', errMsg: ''}

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    // console.log(username, password)
    const data = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', jsonData.jwt_token, {expires: 30})
      this.setState({isMatched: false})
      const {history} = this.props
      history.replace('/')
      // console
    } else {
      this.setState({errMsg: jsonData.error_msg, isMatched: true})
    }
    // console.log(jsonData.jwt_token)
  }

  userNameUpdate = event => {
    // console.log(event.target.value)
    this.setState({username: event.target.value})
  }

  passwordUpdate = event => {
    // console.log(event.target.value)

    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isMatched, errMsg} = this.state
    const token = Cookies.get('jwt_token')
    // console.log(token)

    if (token === undefined) {
      return (
        <div className="login-bg">
          <form onSubmit={this.submitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            <br />

            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              value={username}
              id="username"
              onChange={this.userNameUpdate}
              className="login-input-elements"
              type="text"
              placeholder="USERNAME"
            />
            <br />
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input
              id="password"
              value={password}
              onChange={this.passwordUpdate}
              className="login-input-elements"
              type="password"
              placeholder="PASSWORD"
            />
            <br />
            <button type="submit" className="login-button">
              Login
            </button>
            {isMatched && <p>{errMsg}</p>}
          </form>
        </div>
      )
    }
    return <Redirect to="/" />
  }
}

export default Login
