import React, { Component } from 'react';

export default class NewComment extends Component {
  handleClick = () => {
    var username = this.refs.username.value
    var body = this.refs.body.value
    var post_id = this.props.post_id
    this.props.userExistsOrCreate(username, (user) => {
      $.ajax({
        url: '/api/comments',
        type: 'POST',
        data: { comment: {post_id, user_id: user.id, body} },
        success: (comment) => {
          this.props.handleSubmit(comment)
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
          <textarea ref='body' placeholder='Comment' cols="35" rows="1"/>
        </div>
        <button onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
}
