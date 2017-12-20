import React, { Component } from 'react';

export default class NewComment extends Component {
  handleClick = () => {
    var user_id = this.refs.user_id.value;
    var body = this.refs.body.value;
    var post_id = this.props.post_id;
    $.ajax({
      url: '/api/comments',
      type: 'POST',
      data: { comment: {user_id: user_id, body: body, post_id: post_id} },
      success: (comment) => {
        this.props.handleSubmit(comment);
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <input ref='user_id' placeholder='your id' />
        </div>
        <div>
          <textarea ref='body' placeholder='body of the comment' cols="35" rows="1"/>
        </div>
        <button onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
}
