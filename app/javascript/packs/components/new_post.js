import React, { Component } from 'react';

export default class NewPost extends Component {
  handleClick = () => {
    window.alerts.removeAll()
    var username = this.refs.username.value
    var body = this.refs.body.value
    this.props.userExistsOrCreate(username, (user) => {
      $.ajax({
        url: '/api/posts',
        type: 'POST',
        data: { post: {user_id: user.id, body} },
        success: (post) => {
          this.props.handleSubmit(post)
        },
        error: (badRequest) => {
          var errors = JSON.parse(badRequest.responseText)
          for (var key in errors) {
            var text = key + " " + errors[key]
            window.alerts.addMessage({text, type: "error"})
          }
        }
      })
    })
  }

  render() {
    return (
      <div>
        <div>
          <input ref='username' placeholder='Your name' />
        </div>
        <div>
          <textarea ref='body' placeholder='Tell me about your day' cols="40" rows="5"/>
        </div>
        <button onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
}
