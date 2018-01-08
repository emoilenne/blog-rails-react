import React from 'react'

export default class NewPost extends React.Component {
  handleClick = () => {
    window.alerts.removeAll()
    const body = this.refs.body.value
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post: {
          user_id: this.props.userId,
          body,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json()
            .then(post => this.props.handleSubmit(post))
            .catch(error => window.alerts.addMessage({
              text: `Cannot update page with post "${body}": ${error}`,
              type: 'error',
            }))
          document.getElementById('new_post_text').value = "";
        } else {
          response.json()
            .then((errors) => {
              throw Object.keys(errors).map(key => errors[key].map(error => `${key} ${error}`).join(', ')).join(', ')
            })
            .catch(error => window.alerts.addMessage({
              text: `Cannot create post "${body}": ${error}`,
              type: 'error',
            }))
        }
      })
  }

  render() {
    const postTextInput = <textarea id="new_post_text" ref="body" placeholder="Tell me about your day"/>
    const postSubmitButton = <button onClick={this.handleClick}>Submit</button>
    return (
      <div>
        <div>{postTextInput}</div>
        <div>{postSubmitButton}</div>
      </div>
    )
  }
}
