import React, { Component } from 'react';

export default class AllPosts extends Component {
  handleDelete(id) {
    this.props.handleDelete(id);
  }

  render() {
    var posts= this.props.posts.map((post) => {
      return (
        <div key={post.id}>
          <h3>{post.user_id}</h3>
          <p>{post.body}</p>
          <button onClick={this.handleDelete.bind(this, post.id)}>Delete</button>
        </div>
      )
    });
    return (
      <div>
        {posts}
      </div>
    )
  }
}
