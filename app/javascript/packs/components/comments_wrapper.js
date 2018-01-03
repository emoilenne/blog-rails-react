import React, { Component } from 'react'
import NewComment from './new_comment'
import AllComments from './all_comments'

export default class CommentsWrapper extends Component {
  constructor() {
    super()
    this.state = { comments: [] }
  }

  componentDidMount() {
    $.getJSON(`/api/posts/${this.props.post_id}/comments`, (response) => { this.setState({comments: response}) })
  }

  updateComments = (comment) => {
    var comments = this.state.comments.filter((c) => {
      return c.id != comment.id
    })
    comments.push(comment)
    this.setState({ comments: comments })
  }

  removeComment = (id) => {
    var newComments = this.state.comments.filter((comment) => {
      return comment.id != id
    })
    this.setState({ comments: newComments })
  }

  handleCommentUpdate = (comment) => {
    $.ajax({
      url: `/api/comments/${comment.id}`,
      type: 'PUT',
      data: { comment: comment },
      success: (comment) => {
        this.updateComments(comment)
      }
    })
  }

  handleCommentDelete = (id) => {
    $.ajax({
      url: `/api/comments/${id}`,
      type: 'DELETE',
      success: () => {
        this.removeComment(id)
      }
    })
  }

  render() {
      return (
        <div className="comment-section">
          <AllComments
            comments={this.state.comments}
            handleDelete={this.handleCommentDelete}
            handleUpdate={this.handleCommentUpdate}
            post_id={this.props.post_id}
            userExistsOrCreate={this.props.userExistsOrCreate}/>
          <NewComment
            handleSubmit={this.updateComments}
            post_id={this.props.post_id}
            userExistsOrCreate={this.props.userExistsOrCreate}/>
        </div>
      )
    }
}
