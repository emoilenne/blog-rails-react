import React from 'react'
import NewPost from './new_post'
import AllPosts from './all_posts'

export default class PostsWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      nextEnabled: true,
      tag: false,
      username: false,
      postsLink: '/api/posts',
    }
  }

  componentDidMount() {
    this.loadPosts()
  }

  fetchPosts = () => {
    fetch(this.state.postsLink)
      .then(response => response.json())
      .then(posts => this.setState({ posts }))
      .catch((error) => {
        let typeOfPosts = null
        if (this.state.tag) {
          typeOfPosts = `posts for tag #${this.state.tag}`
        } else if (this.state.username) {
          typeOfPosts = `posts for user ${this.state.username}`
        } else {
          typeOfPosts = 'all posts'
        }
        window.alerts.addMessage({
          text: `Cannot get ${typeOfPosts}: ${error}`,
          type: 'error',
        })
      })
  }

  loadPosts = () => {
    if (this.props.receiveTag) {
      this.setState({
        tag: this.props.match.params.tag,
        postsLink: `/api/posts?tag=${this.props.match.params.tag}`,
      }, this.fetchPosts)
    } else if (this.props.receiveUser) {
      this.setState({
        username: this.props.match.params.username,
        postsLink: `/api/posts?username=${this.props.match.params.username}`,
      }, this.fetchPosts)
    } else {
      this.fetchPosts()
    }
  }

  updatePosts = (post) => {
    const posts = this.state.posts.filter(p => p.id !== post.id)
    posts.unshift(post)
    this.setState({ posts })
  }

  handlePostUpdate = (post) => {
    window.alerts.removeAll()
    fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post }),
    })
      .then(response => response.json())
      .then(newPost => this.updatePosts(newPost))
      .catch(error => window.alerts.addMessage({
        text: `Cannot update post to "${post.body}": ${error}`,
        type: 'error',
      }))
  }

  removePost = (id) => {
    const posts = this.state.posts.filter(post => post.id !== id)
    this.setState({ posts })
  }

  handleDelete = (post) => {
    window.alerts.removeAll()
    fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => this.removePost(post.id))
      .catch(error => window.alerts.addMessage({
        text: `Cannot delete post "${post.body}": ${error}`,
        type: 'error',
      }))
  }

  loadMorePosts = () => {
    window.alerts.removeAll()
    const nextPageLink = `${this.state.postsLink}${this.state.tag || this.state.username ? '&' : '?'}offset=${this.state.posts.length}`
    fetch(nextPageLink)
      .then(response => response.json())
      .then((posts) => {
        if (posts.length === 0) {
          this.setState({ nextEnabled: false })
        }
        this.setState({ posts: this.state.posts.concat(posts) })
      })
  }

  render() {
    let typeOfPosts = null
    if (this.state.tag) {
      typeOfPosts = <p>Posts with #{this.state.tag}</p>
    } else if (this.state.username) {
      typeOfPosts = <p>Posts from {this.state.username}</p>
    } else {
      typeOfPosts = <p>Home page</p>
    }
    const newPost = this.props.receiveTag || this.props.userId === -1
      ? false
      : (
        <NewPost
          handleSubmit={this.updatePosts}
          userId={this.props.userId}
        />)
    const allPosts = (
      <AllPosts
        posts={this.state.posts}
        handleDelete={this.handleDelete}
        handleUpdate={this.handlePostUpdate}
        loadMorePosts={this.loadMorePosts}
        loadMoreEnabled={this.state.nextEnabled}
        userId={this.props.userId}
      />)
    return (
      <div>
        <div>{typeOfPosts}</div>
        <div>{newPost}</div>
        <div>{allPosts}</div>
      </div>
    )
  }
}
