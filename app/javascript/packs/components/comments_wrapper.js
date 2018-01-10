import React from 'react'
import NewComment from './new_comment'
import AllComments from './all_comments'
import API from './api'

export default class CommentsWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = { comments: [] }
  }

  componentDidMount() {
    API.getCommentsOfPost(this.props.post.id, comments => this.setState({ comments }))
  }

  handleCommentUpdate = (comment) => {
    API.updateComment(comment, (newComment) => {
      const comments = this.state.comments.filter(c => c.id !== newComment.id)
      comments.push(newComment)
      this.setState({ comments })
    })
  }

  handleCommentDelete = (comment) => {
    API.deleteComment(comment, () => {
      const comments = this.state.comments.filter(c => c.id !== comment.id)
      this.setState({ comments })
    })
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
          handleSubmit={this.handleCommentUpdate}
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
