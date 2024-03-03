import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import NxtContext from '../../context/NxtContext'
import {
  Container2,
  Container3,
  Label,
  Label1,
  Input,
  Button,
} from '../StyledComponents'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isChecked: false, errMsg: ''}

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickCheck = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {history} = this.props

      Cookies.set('jwtToken', data.jwt_token, {expires: 30}) // creating cookie after checking credentials
      history.replace('/')
    } else {
      this.setState({errMsg: data.error_msg})
    }
  }

  render() {
    const token = Cookies.get('jwtToken')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, isChecked, errMsg} = this.state
    const display = isChecked ? 'text' : 'password'

    return (
      <NxtContext.Consumer>
        {value => {
          const {dark} = value
          const image = !dark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          return (
            <Container2 dark={dark}>
              <Container3 dark={dark}>
                <img
                  src={image}
                  alt="website logo"
                  className="nxt-watch-logo-img"
                />
                <form onSubmit={this.onSubmitForm} className="form-container">
                  <Label htmlFor="username" dark={dark}>
                    USERNAME
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={this.onChangeName}
                    dark={dark}
                  />
                  <Label htmlFor="password" dark={dark}>
                    PASSWORD
                  </Label>
                  <Input
                    type={display}
                    id="password"
                    value={password}
                    onChange={this.onChangePassword}
                    dark={dark}
                  />
                  <div className="display-password-container">
                    <Input
                      type="checkbox"
                      id="Checkbox"
                      value={isChecked}
                      onClick={this.onClickCheck}
                      dark={dark}
                    />
                    <Label1 htmlFor="Checkbox" dark={dark}>
                      Show Password
                    </Label1>
                  </div>
                  <Button type="submit">Login</Button>
                  {errMsg.length !== 0 && <p className="err-msg">*{errMsg}</p>}
                </form>
              </Container3>
            </Container2>
          )
        }}
      </NxtContext.Consumer>
    )
  }
}

export default Login
