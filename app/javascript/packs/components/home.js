import React, { Component } from 'react'
import NewPost from './new_post'
import AllPosts from './all_posts'

export default class Home extends Component {
  constructor() {
    super()
    this.state = { posts: [], nextEnabled: true, tag: false, username: false, postsLink: '/api/posts' }
  }

  fetchPosts = () => {
    $.getJSON(this.state.postsLink, (response) => { this.setState({posts: response}) })
  }

  loadPosts = () => {
    if (this.props.receiveTag) {
      this.setState({ tag: this.props.match.params.tag, postsLink: `/api/posts?tag=${this.props.match.params.tag}` }, this.fetchPosts)
    }
    else if (this.props.receiveUser) {
      this.setState({ username: this.props.match.params.username, postsLink: `/api/posts?username=${this.props.match.params.username}`}, this.fetchPosts)
    }
    else {
      this.fetchPosts()
    }
  }

  componentDidMount() {
    this.loadPosts()
  }

  updatePosts = (post) => {
    var posts = this.state.posts.filter((p) => {
      return p.id != post.id
    })
    posts.unshift(post)
    this.setState({ posts: posts })
  }

  handleDelete = (id) => {
    $.ajax({
      url: `/api/posts/${id}`,
      type: 'DELETE',
      success: () => {
        this.removePost(id)
      }
    })
  }

  handleUpdate = (post) => {
    window.alerts.removeAll()
    $.ajax({
      url: `/api/posts/${post.id}`,
      type: 'PUT',
      data: { post: post },
      success: (post) => {
        this.updatePosts(post)
      },
      error: (badRequest) => {
        var errors = JSON.parse(badRequest.responseText)
        for (var key in errors) {
          var text = key + " " + errors[key]
          window.alerts.addMessage({text, type: "error"})
        }
      }
    })
  }

  loadMorePosts= () => {
    var nextPageLink = this.state.postsLink + (this.state.tag || this.state.username ? '&' : '?') + `offset=${this.state.posts.length}`
    $.getJSON(nextPageLink, (response) => {
      if (response.length == 0)
        this.setState({ nextEnabled: false })
      this.setState({ posts: this.state.posts.concat(response) }) })
  }

  removePost(id) {
    var newPosts = this.state.posts.filter((post) => {
      return post.id != id
    })
    this.setState({ posts: newPosts })
  }

  render() {
    return (
      <div>
        { this.state.tag &&
          <p>Posts with #{this.state.tag}</p>
        }
        { this.state.username &&
          <p>Posts from {this.state.username}</p>
        }
        { !this.props.receiveTag && this.props.userId != -1 &&
          <NewPost
            handleSubmit={this.updatePosts}
            userId={this.props.userId}/>
        }
        <AllPosts
          posts={this.state.posts}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
          loadMorePosts={this.loadMorePosts}
          loadMoreEnabled={this.state.nextEnabled}
          userId={this.props.userId}/>
      </div>
    )
  }
}
