import React, { Component } from 'react';

export default class NewPost extends Component {

  checkUserExistOrCreate = (username) => {
    if (username.match(/^[a-zA-Z]+$/)) {
      $.getJSON(`/api/users/${username}`, (response) => {
        if (!response) {
          $.ajax({
            url: '/api/users',
            type: 'POST',
            data: { user: {name: username} }
          })
        }
      })
      return true
    }
    return false
  }

  submitPost = (user_id, body) => {
    $.ajax({
      url: '/api/posts',
      type: 'POST',
      data: { post: {user_id, body} },
      success: (post) => {
        this.props.handleSubmit(post)
      }
    })
  }

  handleClick = () => {
    var username = this.refs.username.value
    var body = this.refs.body.value
    if (username.match(/^[a-zA-Z]+$/)) {
      $.getJSON(`/api/users/${username}`, (response) => {
        if (!response) {
          $.ajax({
            url: '/api/users',
            type: 'POST',
            data: { user: {name: username} },
            success: (user) => {
              this.submitPost(user.id, body)
            }
          })
        }
        else {
          this.submitPost(response.id, body)
        }
      })
    }
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
