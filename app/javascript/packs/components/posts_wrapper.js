import React from 'react'
import NewPost from './new_post'
import AllPosts from './all_posts'
import API from './api'

export default class PostsWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      nextEnabled: true,
      tag: false,
      username: false,
    }
  }

  componentDidMount() {
    this.loadPosts(0)
  }

  loadPosts = (offset) => {
    const postsUpdate = posts => ({
      posts: this.state.posts.concat(posts),
      nextEnabled: posts.length !== 0,
    })
    if (this.props.receiveTag) {
      const { tag } = this.props.match.params
      API.getPostsForTag(tag, offset, (posts) => {
        this.setState({ ...postsUpdate(posts), tag })
      })
    } else if (this.props.receiveUser) {
      const { username } = this.props.match.params
      API.getPostsForUsername(username, offset, (posts) => {
        this.setState({ ...postsUpdate(posts), username })
      })
    } else {
      API.getPosts(offset, posts => this.setState(postsUpdate(posts)))
    }
  }

  updatePosts = (post) => {
    const posts = this.state.posts.filter(p => p.id !== post.id)
    posts.unshift(post)
    this.setState({ posts })
  }

  handlePostUpdate = (post) => {
    API.updatePost(post, (newPost) => {
      const posts = this.state.posts.filter(p => p.id !== newPost.id)
      posts.unshift(newPost)
      this.setState({ posts })
    })
  }

  handlePostDelete = (post) => {
    API.removePost(post, () => {
      const posts = this.state.posts.filter(p => p.id !== post.id)
      this.setState({ posts })
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
    const newPost = this.props.receiveTag || this.state.username || this.props.userId === -1
      ? false
      : (
        <NewPost
          handleSubmit={this.updatePosts}
          userId={this.props.userId}
        />)
    const allPosts = (
      <AllPosts
        posts={this.state.posts}
        handleDelete={this.handlePostDelete}
        handleUpdate={this.handlePostUpdate}
        loadMorePosts={() => this.loadPosts(this.state.posts.length)}
        loadMoreEnabled={this.state.nextEnabled}
        userId={this.props.userId}
      />)
    return (
      <div className="body-wrapper">
        <div className="type">{typeOfPosts}</div>
        <div className="container new-post">{newPost}</div>
        <div className="all-posts">{allPosts}</div>
      </div>
    )
  }
}
