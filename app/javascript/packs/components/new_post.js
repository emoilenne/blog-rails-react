import React, { Component } from 'react';

export default class NewPost extends Component {
  handleClick = () => {
    var user_id = this.refs.user_id.value;
    var body = this.refs.body.value;
    $.ajax({
      url: '/api/posts',
      type: 'POST',
      data: { post: {user_id: user_id, body: body} },
      success: (post) => {
        this.props.handleSubmit(post);
      }
    });
  }

  render() {
    return (
      <div>
        <input ref='user_id' placeholder='your id' />
        <input ref='body' placeholder='body of the post' />
        <button onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
}
