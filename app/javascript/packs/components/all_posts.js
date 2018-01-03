import React, { Component } from 'react'
import Post from './post'

export default class AllPosts extends Component {
  handleDelete(id) {
    this.props.handleDelete(id)
  }

  handleUpdate = (post) => {
    this.props.handleUpdate(post)
  }

  render() {
    var posts= this.props.posts.map((post) => {
      return (
        <div key={post.id}>
          <Post post={post}
            handleDelete={this.handleDelete.bind(this, post.id)}
            handleUpdate={this.handleUpdate}
            userId={this.props.userId}/>
        </div>
      )
    })
    var next_button = this.props.loadMoreEnabled ? <button onClick={this.props.loadMorePosts}>Next</button> : ""
    return (
      <div>
        {posts}
        {next_button}
      </div>
    )
  }
}
