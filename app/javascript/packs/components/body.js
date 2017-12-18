import React, { Component } from 'react';
import NewPost from './new_post';
import AllPosts from './all_posts';

export default class Body extends Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentDidMount() {
    $.getJSON('/api/posts/', (response) => { this.setState({ posts: response }) });
  }

  updatePosts = () => {
    $.getJSON('/api/posts/', (response) => { this.setState({ posts: response }) });
  }

  handleDelete = (id) => {
    $.ajax({
      url: `/api/posts/${id}`,
      type: 'DELETE',
      success: () => {
        this.removePostClient(id);
      }
    });
  }

  handleUpdate = (post) => {
    $.ajax({
      url: `/api/posts/${post.id}`,
      type: 'PUT',
      data: { post: post },
      success: () => {
        this.updatePosts();
      }
    });
  }

  removePostClient(id) {
    var newPosts = this.state.posts.filter((post) => {
      return post.id != id;
    });
    this.setState({ posts: newPosts });
  }

  render() {
    return (
      <div>
        <NewPost handleSubmit={this.updatePosts}/>
        <AllPosts posts={this.state.posts} handleDelete={this.handleDelete} onUpdate={this.handleUpdate}/>
      </div>
    )
  }
}
