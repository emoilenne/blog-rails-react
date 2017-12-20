import React, { Component } from 'react';

export default class Comment extends Component {
  constructor() {
    super();
    this.state = { editable: false };
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
    var user_id = this.state.editable ? <input type='text' ref='user_id' defaultValue={this.props.comment.user_id} />
                                   : <h3>{this.props.comment.user_id}</h3>;
    var body = this.state.editable ? <textarea ref='body' defaultValue={this.props.comment.body} cols="30" rows="1"/>
                                   : <p>{this.props.comment.body}</p>;

      return (
        <div className="container comment">
          <div>
            <div>{user_id}</div>
            <button className="delete-button" onClick={this.props.handleDelete}>Delete</button>
            <button className="edit-button" onClick={this.handleEdit.bind(this)}>{this.state.editable ? 'Submit' : 'Edit' }</button>
          </div>
          <div>{body}</div>
        </div>
      );
    }
}
