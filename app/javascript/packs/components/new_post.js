import React from 'react'
import API from './api'

export default class NewPost extends React.Component {
  handleClick = () => {
    const post = {
      user_id: this.props.userId,
      body: this.refs.body.value,
    }
    API.createPost(post, newPost => this.props.handleSubmit(newPost))
  }

  render() {
    const postTextInput = <textarea id="new_post_text" ref="body" placeholder="Tell me about your day" />
    const postSubmitButton = <button onClick={this.handleClick}>Submit</button>
    return (
      <div>
        <div>{postTextInput}</div>
        <div>{postSubmitButton}</div>
      </div>
    )
  }
}
