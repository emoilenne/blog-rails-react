import React, { Component } from 'react';

export default class Comment extends Component {
  constructor() {
    super();
    this.state = { editable: false, username: "" };
  }

  componentDidMount() {
    $.getJSON(`/api/users/${this.props.comment.user_id}`, (response) => { this.setState({username: response.name}); });
  }

  handleEdit() {
    if (this.state.editable) {
      var id = this.props.comment.id;
      var user_id = this.refs.user_id.value;
      var post_id = this.props.post_id;
      var body = this.refs.body.value;
      var comment = {id: id, user_id: user_id, post_id: post_id, body: body};
      this.props.handleUpdate(comment);
    }
    this.setState({ editable: !this.state.editable });
  }

  render() {
    var dateFormat = require('dateformat');
    var updated_at = dateFormat(new Date(this.props.comment.updated_at), "HH:MM dd-mm-yyyy");
    var user = this.state.editable ? <input type='text' ref='user_id' defaultValue={this.props.comment.user_id} />
                                   : <div><h3>{this.state.username}</h3><h6>{updated_at}</h6></div>;
    var body = this.state.editable ? <textarea ref='body' defaultValue={this.props.comment.body} cols="30" rows="1"/>
                                   : <p>{this.props.comment.body}</p>;

      return (
        <div className="container comment">
          <div>
            <div>{user}</div>
            <button className="delete-button" onClick={this.props.handleDelete}>Delete</button>
            <button className="edit-button" onClick={this.handleEdit.bind(this)}>{this.state.editable ? 'Submit' : 'Edit' }</button>
          </div>
          <div>{body}</div>
        </div>
      );
    }
}
