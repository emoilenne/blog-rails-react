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
        <div>
          <input ref='user_id' placeholder='your id' />
        </div>
        <div>
          <textarea ref='body' placeholder='body of the post' cols="40" rows="5"/>
        </div>
        <button onClick={this.handleClick}>Submit</button>
      </div>
    )
  }
}
