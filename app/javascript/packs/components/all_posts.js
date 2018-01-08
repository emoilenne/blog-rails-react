import React from 'react'
import Post from './post'

export default class AllPosts extends React.Component {
  handleDelete = (post) => {
    this.props.handleDelete(post)
  }

  handleUpdate = (post) => {
    this.props.handleUpdate(post)
  }

  render() {
    const posts = this.props.posts.map(post => (
      <div key={post.id}>
        <Post
          post={post}
          handleDelete={() => this.handleDelete(post)}
          handleUpdate={this.handleUpdate}
          userId={this.props.userId}
        />
      </div>
    ))
    const next_button = this.props.loadMoreEnabled
      ? <button onClick={this.props.loadMorePosts}>Next</button>
      : false
    return (
      <div>
        {posts}
        {next_button}
      </div>
    )
  }
}
