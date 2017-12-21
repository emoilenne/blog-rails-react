import React, { Component } from 'react';

export default class NewComment extends Component {
  submitComment = (post_id, user_id, body) => {
    $.ajax({
      url: '/api/comments',
      type: 'POST',
      data: { comment: {post_id, user_id, body} },
      success: (comment) => {
        this.props.handleSubmit(comment)
      }
    })
  }

  handleClick = () => {
    var username = this.refs.username.value
    var body = this.refs.body.value
    var post_id = this.props.post_id
    if (username.match(/^[a-zA-Z]+$/)) {
      $.getJSON(`/api/users/${username}`, (response) => {
        if (!response) {
          $.ajax({
            url: '/api/users',
            type: 'POST',
            data: { user: {name: username} },
            success: (user) => {
              this.submitComment(post_id, user.id, body)
            }
          })
        }
        else {
          this.submitComment(post_id, response.id, body)
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
          <textarea ref='body' placeholder='Comment' cols="35" rows="1"/>
        </div>
        <button onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
}
