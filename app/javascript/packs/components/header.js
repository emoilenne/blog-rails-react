import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  login = () => {
    window.alerts.removeAll()
    var username = this.refs.username.value
    $.getJSON(`/api/users/name/${username}`, (response) => {
      if (!response) {
        $.ajax({
          url: '/api/users',
          type: 'POST',
          data: { user: {name: username} },
          success: (user) => {
            this.props.login(user.id, username)
          },
          error: (badRequest) => {
            var errors = JSON.parse(badRequest.responseText)
            for (var key in errors) {
              var text = key + " " + errors[key]
              window.alerts.addMessage({text, type: "error"})
            }
          }
        })
      }
      else {
        this.props.login(response.id, username)
      }
    })
  }

  render() {
    var loginSection = (this.props.username) ? <div><p>Welcome {this.props.username}</p></div>
                                             : <div>
                                                 <div>
                                                   <input ref='username' placeholder='Your name' />
                                                 </div>
                                                 <button onClick={this.login}>Login</button>
                                               </div>
    return (
      <div>
        <h1><Link to={`/`} className="header-logo" >PandaBl🐼g</Link></h1>
        {loginSection}
      </div>
    )
  }
}
