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

  componentDidMount() {
    this.setUsername(this.props.comment.user_id)
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

  render() {
    const updatedAt = this.state.editable
      ? false
      : dateFormat(new Date(this.props.comment.updated_at), 'HH:MM dd-mm-yyyy')
    const body = this.state.editable
      ? <textarea ref="body" defaultValue={this.props.comment.body} cols="30" rows="1" />
      : <p>{this.props.comment.body}</p>
    const username = this.state.editable
      ? false
      : <Link to={`/users/${this.state.username}`}><h3>{this.state.username}</h3></Link>
    const editButton = this.props.userId === -1
      ? false
      : <button className="edit-button" onClick={this.handleEdit}>{this.state.editable ? 'Submit' : 'Edit' }</button>
    const deleteButton = <button className="delete-button" onClick={this.props.handleDelete}>Delete</button>
    return (
      <div className="container comment">
        <div>
          <div>{username}</div>
          <div>{updatedAt}</div>
          <div>{deleteButton}</div>
          <div>{editButton}</div>
        </div>
        <div>{body}</div>
      </div>
    )
  }
}
