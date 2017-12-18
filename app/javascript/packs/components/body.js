import React, { Component } from 'react';
import NewPost from './new_post';
import AllPosts from './all_posts';

export default class Body extends Component {
  constructor() {
    super();
    this.state = { posts: [], page: 1, nextEnabled: true };
  }

  componentDidMount() {
    $.getJSON('/api/posts/', (response) => { this.setState({posts: response}); });
  }

  updatePosts = (post) => {
    var posts = this.state.posts.filter((p) => {
      return p.id != post.id;
    });
    posts.unshift(post);
    this.setState({ posts: posts })
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
      success: (post) => {
        this.updatePosts(post);
      }
    });
  }

  loadMorePosts= () => {
    var new_page = this.state.page + 1;
    $.getJSON(`/api/posts/?page=${new_page}`, (response) => {
      if (response.length == 0)
        this.setState({ nextEnabled: false });
      this.setState({ posts: this.state.posts.concat(response), page: new_page }) });
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
        <AllPosts posts={this.state.posts} handleDelete={this.handleDelete}
                                           onUpdate={this.handleUpdate}
                                           loadMorePosts={this.loadMorePosts}
                                           loadMoreEnabled={this.state.nextEnabled}/>
      </div>
    )
  }
}
