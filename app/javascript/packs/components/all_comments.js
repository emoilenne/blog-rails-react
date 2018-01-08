import React from 'react'
import Comment from './comment'

export default class AllComments extends React.Component {
  handleDelete = (id) => {
    this.props.handleDelete(id)
  }

  handleUpdate = (comment) => {
    this.props.handleUpdate(comment)
  }

  render() {
    const comments = this.props.comments.map(comment => (
      <div key={comment.id}>
        <Comment
          comment={comment}
          handleDelete={() => this.handleDelete(comment)}
          handleUpdate={this.handleUpdate}
          post_id={this.props.post_id}
          userId={this.props.userId}
        />
      </div>
    ))
    return (
      <div>
        {comments}
      </div>
    )
  }
}
