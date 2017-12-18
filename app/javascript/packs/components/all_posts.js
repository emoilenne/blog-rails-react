import React, { Component } from 'react';
import Post from './post';

export default class AllPosts extends Component {
  handleDelete(id) {
    this.props.handleDelete(id);
  }

  onUpdate = (post) => {
    this.props.onUpdate(post);
  }

  render() {
    var posts= this.props.posts.map((post) => {
      return (
        <div key={post.id}>
          <Post post={post}
            handleDelete={this.handleDelete.bind(this, post.id)}
            handleUpdate={this.onUpdate}/>
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
