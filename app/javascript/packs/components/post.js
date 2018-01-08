/* eslint react/no-array-index-key: 0 */
import React from 'react'
import { Link } from 'react-router-dom'
import CommentsWrapper from './comments_wrapper'

const dateFormat = require('dateformat')

export default class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false,
      username: '',
      liked: false,
      likeId: -1,
      likesCount: 0,
    }
  }

  componentDidMount() {
    window.alerts.removeAll()
    this.setUsername(this.props.post.user_id)
    fetch(`/api/posts/${this.props.post.id}/likes`)
      .then(response => response.json())
      .then((likes) => {
        this.setState({ likesCount: likes.length })
        const likeOfCurrectUser = likes.find(like => like.user_id === this.props.userId)
        if (likeOfCurrectUser) {
          this.setState({
            liked: true,
            likeId: likeOfCurrectUser.id,
          })
        }
      })
      .catch(error => window.alerts.addMessage({
        text: `Cannot get likes of the post "${this.props.post.body}": ${error}`,
        type: 'error',
      }))
  }

  setUsername = (userId) => {
    window.alerts.removeAll()
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(user => this.setState({ username: user.name }))
      .catch(error => window.alerts.addMessage({
        text: `Cannot get username of the post "${this.props.post.body}": ${error}`,
        type: 'error',
      }))
  }

  handleEdit = () => {
    if (this.state.editable) {
      const post = {
        id: this.props.post.id,
        user_id: this.props.userId,
        body: this.refs.body.value,
      }
      this.props.handleUpdate(post)
      this.setUsername(this.props.userId)
      this.setState({ editable: false })
    } else {
      this.setState({ editable: true })
    }
  }

  handleCommentDelete = (comment) => {
    window.alerts.removeAll()
    fetch(`/api/commens/${comment.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => this.removeComment(comment.id))
      .catch(error => window.alerts.addMessage({
        text: `Cannot delete comment "${comment.body}": ${error}`,
        type: 'error',
      }))
  }

  likePost = () => {
    if (this.state.liked) {
      fetch(`/api/likes/${this.state.likeId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(() => this.setState({
          liked: false,
          likeId: -1,
          likesCount: this.state.likesCount - 1,
        }))
        .catch(error => window.alerts.addMessage({
          text: `Cannot remove like from post "${this.props.post.body}": ${error}`,
          type: 'error',
        }))
    } else {
      fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          like: {
            post_id: this.props.post.id,
            user_id: this.props.userId,
          },
        }),
      })
        .then(response => response.json())
        .then(like => this.setState({
          liked: true,
          likeId: like.id,
          likesCount: this.state.likesCount + 1,
        }))
        .catch(error => window.alerts.addMessage({
          text: `Cannot like the post "${this.props.post.body}": ${error}`,
          type: 'error',
        }))

    }
  }

  insertTagLinks = () => {
    let bodyText = this.props.post.body
    const tagRegex = /#\w+/g
    const tags = bodyText.match(tagRegex)
    if (tags) {
      const bodySplittedText = bodyText.split(tagRegex)
      bodyText = [bodySplittedText[0]]
      tags.forEach((tag, index) => {
        const tag_name = tag.substr(1)
        bodyText.push(<Link to={`/tags/${tag_name}`} key={`${index}`} >{tag}</Link>)
        bodyText.push(bodySplittedText[index + 1])
      })
    }
    return bodyText
  }

  render() {
    const updatedAt = this.state.editable
      ? false
      : dateFormat(new Date(this.props.post.updated_at), 'HH:MM dd-mm-yyyy')
    const body = this.state.editable
      ? <textarea ref="body" defaultValue={this.props.post.body} cols="40" rows="5" />
      : <p>{this.insertTagLinks()}</p>
    const editButton = this.props.userId === -1
      ? false
      : <button className="edit-button" onClick={this.handleEdit}>{this.state.editable ? 'Submit' : 'Edit' }</button>
    const likeButton = this.props.userId === -1
      ? 'Liked by '
      : <button className="like-button" onClick={this.likePost}>{this.state.liked ? '❤' : '♡'}</button>
    const deleteButton = <button className="delete-button" onClick={this.props.handleDelete}>Delete</button>
    const username = this.state.editable
      ? false
      : <Link to={`/users/${this.state.username}`}><h3>{this.state.username}</h3></Link>
    const likesCount = <p>{this.state.likesCount}</p>
    const commentsWrapper = (
      <CommentsWrapper
        post={this.props.post}
        userId={this.props.userId}
      />
    )
    return (
      <div>
        <div className="container">
          <div>
            <div>{username}</div>
            <div>{updatedAt}</div>
            <div>{deleteButton}</div>
            <div>{editButton}</div>
          </div>
          <div>{body}</div>
          <div>
            {likeButton}
            {likesCount}
          </div>
        </div>
        <div>{commentsWrapper}</div>
      </div>
    )
  }
}
