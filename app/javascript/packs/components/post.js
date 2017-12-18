import React, { Component } from 'react';

export default class Post extends Component {
  constructor() {
    super();
    this.state = { editable: false };
  }

  handleEdit() {
    if (this.state.editable) {
      var id = this.props.post.id;
      var user_id = this.refs.user_id.value;
      var body = this.refs.body.value;
      var post = {id: id, user_id: user_id, body: body};
      this.props.handleUpdate(post);
    }
    this.setState({ editable: !this.state.editable });
  }

  render() {
    var user_id = this.state.editable ? <input type='text' ref='user_id' defaultValue={this.props.post.user_id} />
                                   : <h1>{this.props.post.user_id}</h1>;
    var body = this.state.editable ? <textarea ref='body' defaultValue={this.props.post.body} cols="40" rows="5"/>
                                   : <p>{this.props.post.body}</p>;

      return (
        <div className="container">
          <div>{user_id}</div>
          <div>{body}</div>
          <button onClick={this.handleEdit.bind(this)}>{this.state.editable ? 'Submit' : 'Edit' }</button>
          <button onClick={this.props.handleDelete}>Delete</button>
        </div>
      );
    }
}
