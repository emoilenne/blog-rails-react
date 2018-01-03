import React, { Component } from 'react'

export default class Comment extends Component {
  constructor() {
    super()
    this.state = { editable: false, username: "" }
  }

  setUsername = (userId) => {
    $.getJSON(`/api/users/${userId}`, (response) => { this.setState({username: response.name}) })
  }

  componentDidMount() {
    this.setUsername(this.props.comment.user_id)
  }

  handleEdit() {
    if (this.state.editable) {
      var id = this.props.comment.id
      var post_id = this.props.post_id
      var body = this.refs.body.value
      var comment = {id, user_id: this.props.userId, post_id, body}
      this.props.handleUpdate(comment)
      this.setUsername(this.props.userId)
      this.setState({ editable: false })
    }
    else {
      this.setState({ editable: true })
    }
  }

  render() {
    var dateFormat = require('dateformat')
    var updatedAt = dateFormat(new Date(this.props.comment.updated_at), "HH:MM dd-mm-yyyy")
    var body = this.state.editable ? <textarea ref='body' defaultValue={this.props.comment.body} cols="30" rows="1"/>
                                   : <p>{this.props.comment.body}</p>

      return (
        <div className="container comment">
          <div>
            { !this.state.editable &&
              <div><h3>{this.state.username}</h3><h6>{updatedAt}</h6></div>
            }
            <button className="delete-button" onClick={this.props.handleDelete}>Delete</button>
            { this.props.userId != -1 &&
              <button className="edit-button" onClick={this.handleEdit.bind(this)}>{this.state.editable ? 'Submit' : 'Edit' }</button>
            }
          </div>
          <div>{body}</div>
        </div>
      )
    }
}
