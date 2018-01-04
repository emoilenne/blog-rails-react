import React from 'react'

export default class NewComment extends React.Component {
  handleClick = () => {
    window.alerts.removeAll()
    const body = this.refs.body.value
    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: {
          post_id: this.props.post_id,
          user_id: this.props.userId,
          body,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json()
            .then(comment => this.props.handleSubmit(comment))
            .catch(error => window.alerts.addMessage({
              text: `Cannot update page with comment "${body}": ${error}`,
              type: 'error',
            }))
        } else {
          response.json()
            .then((errors) => {
              throw Object.keys(errors).map(key => errors[key].map(error => `${key} ${error}`).join(', ')).join(', ')
            })
            .catch(error => window.alerts.addMessage({
              text: `Cannot create comment "${body}": ${error}`,
              type: 'error',
            }))
        }
      })
  }

  render() {
    const commentTextInput = <textarea ref="body" placeholder="Comment" cols="35" rows="1" />
    const commentSubmitButton = <button onClick={this.handleClick}>Submit</button>
    return (
      <div>
        <div>{commentTextInput}</div>
        <div>{commentSubmitButton}</div>
      </div>
    )
  }
}
