import React, { Component } from 'react'
import Comment from './comment'

export default class AllComments extends Component {
  handleDelete(id) {
    this.props.handleDelete(id)
  }

  handleUpdate = (comment) => {
    this.props.handleUpdate(comment)
  }

  render() {
    var comments= this.props.comments.map((comment) => {
      return (
        <div key={comment.id}>
          <Comment comment={comment}
            handleDelete={this.handleDelete.bind(this, comment.id)}
            handleUpdate={this.handleUpdate}
            post_id={this.props.post_id}
            userExistsOrCreate={this.props.userExistsOrCreate}/>
        </div>
      )
    })
    return (
      <div>
        {comments}
      </div>
    )
  }
}
