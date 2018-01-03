import React, { Component } from 'react'

export default class NewComment extends Component {
  handleClick = () => {
    window.alerts.removeAll()
    var body = this.refs.body.value
    var post_id = this.props.post_id
    $.ajax({
      url: '/api/comments',
      type: 'POST',
      data: { comment: {post_id, user_id: this.props.userId, body} },
      success: (comment) => {
        this.props.handleSubmit(comment)
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

  render() {
    return (
      <div>
        <div>
          <textarea ref='body' placeholder='Comment' cols="35" rows="1"/>
        </div>
        <button onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
}
