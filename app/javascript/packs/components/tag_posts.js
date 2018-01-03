import React, { Component } from 'react';
import Home from './home';

export default class TagPosts extends Component {
  render() {
    return (
      <Home postsLink={`/api/posts?tag=${this.props.match.params.tag}`} />
    )
  }
}
