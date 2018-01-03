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

  userExistsOrCreate = (username, call_on_success) => {
    $.getJSON(`/api/users/name/${username}`, (response) => {
      if (!response) {
        $.ajax({
          url: '/api/users',
          type: 'POST',
          data: { user: {name: username} },
          success: (user) => {
            call_on_success(user)
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
      else {
        call_on_success(response)
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
  //  console.log(this.state.postsLink)
    return (
      <div>
        { !this.props.receiveTag &&
          <NewPost
            handleSubmit={this.updatePosts}
            userExistsOrCreate={this.userExistsOrCreate}/>
        }
        <AllPosts
          posts={this.state.posts}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
          loadMorePosts={this.loadMorePosts}
          loadMoreEnabled={this.state.nextEnabled}
          userExistsOrCreate={this.userExistsOrCreate}/>
      </div>
    )
  }
}
