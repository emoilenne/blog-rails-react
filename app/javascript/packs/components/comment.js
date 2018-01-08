import React from 'react'
import { Link } from 'react-router-dom'

const dateFormat = require('dateformat')

export default class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editable: false,
      username: '',
    }
  }

  componentDidMount() {
    this.setUsername(this.props.comment.user_id)
  }

  setUsername = (userId) => {
    window.alerts.removeAll()
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(user => this.setState({ username: user.name }))
      .catch(error => window.alerts.addMessage({
        text: `Cannot get username of the comment "${this.props.comment.body}": ${error}`,
        type: 'error',
      }))
  }

  handleEdit = () => {
    if (this.state.editable) {
      const comment = {
        id: this.props.comment.id,
        user_id: this.props.userId,
        post_id: this.props.post_id,
        body: this.refs.body.value,
      }
      this.props.handleUpdate(comment)
      this.setUsername(this.props.userId)
      this.setState({ editable: false })
    } else {
      this.setState({ editable: true })
    }
  }

  cancelEdit = () => {
    this.setState({ editable: false })
  }

  render() {
    const updatedAt = this.state.editable
      ? false
      : dateFormat(new Date(this.props.comment.updated_at), 'HH:MM dd-mm-yyyy')
    const body = this.state.editable
      ? <textarea className="edit-comment" ref="body" defaultValue={this.props.comment.body} cols="30" rows="1" />
      : <p>{this.props.comment.body}</p>
    const username = this.state.editable
      ? false
      : <Link to={`/users/${this.state.username}`}><h3>{this.state.username}</h3></Link>
    const editButton = this.props.userId === -1
      ? false
      : <div className={this.state.editable ? 'icon-ok' : 'icon-pencil'} onClick={this.handleEdit} />
    const deleteButton = <div className="icon-remove" onClick={this.state.editable ? this.cancelEdit : this.props.handleDelete} />
    return (
      <div className="comment-wrapper container">
        <div className="comment-indicator">
          <div className="icon-chevron-right" />
        </div>
        <div className="comment-section">
          <div className="post-header">
            <div className="username">{username}</div>
            <div className="updated-at">{updatedAt}</div>
            <div className="delete-button">{deleteButton}</div>
            <div className="edit-button">{editButton}</div>
          </div>
          <div className="comment-body">{body}</div>
        </div>
      </div>
    )
  }
}
