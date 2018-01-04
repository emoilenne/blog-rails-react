import React, { Component } from 'react'
import NewPost from './new_post'
import AllPosts from './all_posts'

export default class Home extends Component {
  constructor() {
    super()
    this.state = { posts: [], nextEnabled: true, tag: false, postsLink: '/api/posts' }
  }

  loadPosts = () => {
    if (this.props.receiveTag) {
      this.setState({ tag: this.props.match.params.tag, postsLink: `/api/posts?tag=${this.props.match.params.tag}` }, () => {
        $.getJSON(this.state.postsLink, (response) => { this.setState({posts: response}) })
      })
    }
    else {
      $.getJSON(this.state.postsLink, (response) => { this.setState({posts: response}) })
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
    $.ajax({
      url: `/api/posts/${post.id}`,
      type: 'PUT',
      data: { post: post },
      success: (post) => {
        this.updatePosts(post)
      }
    })
  }

  loadMorePosts= () => {
    var nextPageLink = this.state.postsLink + (this.state.tag ? '&' : '?') + `offset=${this.state.posts.length}`
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
