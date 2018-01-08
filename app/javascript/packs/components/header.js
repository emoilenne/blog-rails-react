import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  createUser = (name, callOnSuccess) => {
    window.alerts.removeAll()
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { name } }),
    })
      .then((response) => {
        if (response.ok) {
          response.json()
            .then(user => callOnSuccess(user))
            .catch(error => window.alerts.addMessage({
              text: `Cannot login with name "${name}": ${error}`,
              type: 'error',
            }))
        } else {
          response.json()
            .then((errors) => {
              throw Object.keys(errors).map(key => errors[key].map(error => `${key} ${error}`).join(', ')).join(', ')
            })
            .catch(error => window.alerts.addMessage({
              text: `Cannot create user with name "${name}": ${error}`,
              type: 'error',
            }))
        }
      })
  }

  login = () => {
    window.alerts.removeAll()
    const username = this.refs.username.value
    const callOnSuccess = user => this.props.login(user.id, user.name)
    fetch(`/api/users/name/${username}`)
      .then(response => response.json())
      .then((user) => {
        if (user) {
          callOnSuccess(user)
        } else {
          this.createUser(username, callOnSuccess)
        }
      })
      .catch(error => window.alerts.addMessage({
        text: `Cannot login with username "${username}": ${error}`,
        type: 'error',
      }))
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
      <div className="header">
        <div className="wrapper">
          <div className="logo">{logo}</div>
          <div className="greeting">{greetingMessage}</div>
          <div className="login">{login}</div>
        </div>
      </div>
    )
  }
}
