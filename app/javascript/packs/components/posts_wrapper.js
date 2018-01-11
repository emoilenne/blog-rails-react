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
      sortBy: 'date',
      sortType: 'desc',
    }
  }

  componentDidMount() {
    this.loadPosts(0, this.state.sortBy, this.state.sortType)
  }

  loadPosts = (offset, sortBy, sortType) => {
    const postsUpdate = posts => ({
      posts: this.state.posts.concat(posts),
      nextEnabled: posts.length !== 0,
    })
    if (this.props.receiveTag) {
      const { tag } = this.props.match.params
      API.getPostsForTag(
        tag, offset, sortBy, sortType,
        posts => this.setState({ ...postsUpdate(posts), tag }),
      )
    } else if (this.props.receiveUser) {
      const { username } = this.props.match.params
      API.getPostsForUsername(
        username, offset, sortBy, sortType,
        posts => this.setState({ ...postsUpdate(posts), username }),
      )
    } else {
      API.getPosts(
        offset, sortBy, sortType,
        posts => this.setState(postsUpdate(posts)),
      )
    }
  }

  handlePostUpdate = (post) => {
    API.updatePost(post, (newPost) => {
      const posts = this.state.posts.filter(p => p.id !== newPost.id)
      posts.unshift(newPost)
      this.setState({ posts })
    })
  }

  handlePostDelete = (post) => {
    API.deletePost(post, () => {
      const posts = this.state.posts.filter(p => p.id !== post.id)
      this.setState({ posts })
    })
  }

  getSortIconClassName = (sortBy) => {
    if (this.state.sortBy === sortBy) {
      return `icon-sort-by-attributes${this.state.sortType === 'desc' ? '-alt' : ''}`
    }
    return 'icon-sort-by-attributes-alt'
  }

  getSortContentClassName = (sortBy) => {
    if (this.state.sortBy === sortBy) {
      return 'sort-selected'
    }
    return 'sort-not-selected'
  }

  handleSortChange = (sortBy) => {
    let sortType = 'desc'
    if (this.state.sortBy === sortBy) {
      sortType = this.state.sortType === 'asc' ? 'desc' : 'asc'
      this.setState({ sortType, posts: [] })
    } else {
      this.setState({ sortBy, sortType: 'desc', posts: [] })
    }
    this.loadPosts(0, sortBy, sortType)
  }

  render() {
    let typeOfPosts = null
    if (this.state.tag) {
      typeOfPosts = <b>Posts with #{this.state.tag}</b>
    } else if (this.state.username) {
      typeOfPosts = <b>Posts from {this.state.username}</b>
    } else {
      typeOfPosts = <b>Home page</b>
    }
    const newPost = this.props.receiveTag || this.state.username || this.props.userId === -1
      ? false
      : (
        <NewPost
          handleSubmit={this.handlePostUpdate}
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
    const sortDate = (
      <div className={this.getSortContentClassName('date')} onClick={() => this.handleSortChange('date')}>
        <i className={this.getSortIconClassName('date')} />
        <div className="sort-name">Date</div>
      </div>)
    const sortLikes = (
      <div className={this.getSortContentClassName('likes')} onClick={() => this.handleSortChange('likes')}>
        <i className={this.getSortIconClassName('likes')} />
        <div className="sort-name">Likes</div>
      </div>)
    const sortComments = (
      <div className={this.getSortContentClassName('comments')} onClick={() => this.handleSortChange('comments')}>
        <i className={this.getSortIconClassName('comments')} />
        <div className="sort-name">Comments</div>
      </div>)
    return (
      <div className="body-wrapper">
        <div className="type">{typeOfPosts}</div>
        <div className="container new-post">{newPost}</div>
        <div className="sort-wrapper">
          <div className="sort-content">{sortDate}</div>
          <div className="sort-content">{sortLikes}</div>
          <div className="sort-content">{sortComments}</div>
        </div>
        <div className="all-posts">{allPosts}</div>
      </div>
    )
  }
}
