import React from 'react'
import NewComment from './new_comment'
import AllComments from './all_comments'

export default class CommentsWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = { comments: [] }
  }

  componentDidMount() {
    window.alerts.removeAll()
    fetch(`/api/posts/${this.props.post.id}/comments`)
      .then(response => response.json())
      .then(comments => this.setState({ comments }))
      .catch(error => window.alerts.addMessage({
        text: `Cannot get comments of the post "${this.props.post.body}": ${error}`,
        type: 'error',
      }))
  }

  updateComments = (comment) => {
    const comments = this.state.comments.filter(c => c.id !== comment.id)
    comments.push(comment)
    this.setState({ comments })
  }

  handleCommentUpdate = (comment) => {
    window.alerts.removeAll()
    fetch(`/api/comments/${comment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(newComment => this.updateComments(newComment))
        } else {
          response.json()
            .then((errors) => {
              throw Object.keys(errors).map(key => errors[key].map(error => `${key} ${error}`).join(', ')).join(', ')
            })
            .catch(error => window.alerts.addMessage({
              text: `Cannot update comment: ${error}`,
              type: 'error',
            }))
        }
      })
  }

  removeComment = (id) => {
    const comments = this.state.comments.filter(comment => comment.id !== id)
    this.setState({ comments })
  }

  handleCommentDelete = (comment) => {
    window.alerts.removeAll()
    fetch(`/api/comments/${comment.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => this.removeComment(comment.id))
      .catch(error => window.alerts.addMessage({
        text: `Cannot delete comment "${comment.body}": ${error}`,
        type: 'error',
      }))
  }

  render() {
    const allComments = (
      <AllComments
        comments={this.state.comments}
        handleDelete={this.handleCommentDelete}
        handleUpdate={this.handleCommentUpdate}
        post_id={this.props.post.id}
        userId={this.props.userId}
      />
    )
    const newComment = this.props.userId === -1
      ? false
      : (
        <NewComment
          handleSubmit={this.updateComments}
          post_id={this.props.post.id}
          userId={this.props.userId}
        />)
    return (
      <div>
        <div>{allComments}</div>
        <div className="container new-post">{newComment}</div>
      </div>
    )
  }
}
