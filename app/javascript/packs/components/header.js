import React from 'react'
import { Link } from 'react-router-dom'
import API from './api'

export default class Header extends React.Component {
  login = () => {
    window.alerts.removeAll()
    const username = this.refs.username.value
    const callOnSuccess = user => this.props.login(user.id, user.name)
    API.getUserByName(username, (user) => {
      if (user) {
        callOnSuccess(user)
      } else {
        API.createUser(username, callOnSuccess)
      }
    })
  }

  keyPress = (event) => {
    if (event.keyCode === 13) {
      this.login()
    }
  }

  render() {
    const greetingMessage = (this.props.username)
      ? <p>Welcome {this.props.username}</p>
      : <p>You must login for posting or editing</p>
    const login = (this.props.username)
      ? false
      : <input ref="username" placeholder="Your name" onKeyDown={this.keyPress} />
    const logo = <Link to="/" className="header-logo" >PandaBl🐼g</Link>
    return (
      <div className="header-wrapper">
        <div className="logo">{logo}</div>
        <div className="greeting">{greetingMessage}</div>
        <div className="login">{login}</div>
      </div>
    )
  }
}
