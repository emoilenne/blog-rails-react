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

  handleSubmit = (post) => {
    $.getJSON('/api/posts/', (response) => { this.setState({ posts: response }) });
  }

  handleDelete = (id) => {
    $.ajax({
      url: `/api/posts/${id}`,
      type: 'DELETE',
      success: () => {
        this.removePostClient(id);
      }
    })
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
        <NewPost handleSubmit={this.handleSubmit}/>
        <AllPosts posts={this.state.posts} handleDelete={this.handleDelete}/>
      </div>
    )
  }
}
