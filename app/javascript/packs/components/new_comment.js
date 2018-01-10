import React from 'react'
import API from './api'

export default class NewComment extends React.Component {
  handleClick = () => {
    const comment = {
      post_id: this.props.post_id,
      user_id: this.props.userId,
      body: this.refs.body.value,
    }
    API.createComment(comment, (newComment) => {
      document.getElementById(`new_comment_text_${this.props.post_id}`).value = ''
      this.props.handleSubmit(newComment)
    })
  }

  render() {
    const commentTextInput = <textarea id={`new_comment_text_${this.props.post_id}`} ref="body" placeholder="Comment" cols="35" rows="1" />
    const commentSubmitButton = <button onClick={this.handleClick}>Submit</button>
    return (
      <div>
        <div>{commentTextInput}</div>
        <div>{commentSubmitButton}</div>
      </div>
    )
  }
}
