import React, { Component } from 'react';
import NewComment from './new_comment';
import AllComments from './all_comments';

export default class Post extends Component {
  constructor() {
    super();
    this.state = { editable: false, comments: [] };
  }

  componentDidMount() {
    $.getJSON(`/api/comments/?post=${this.props.post.id}`, (response) => { this.setState({comments: response}); });
  }

  handlePostEdit() {
    if (this.state.editable) {
      var id = this.props.post.id;
      var user_id = this.refs.user_id.value;
      var body = this.refs.body.value;
      var post = {id: id, user_id: user_id, body: body};
      this.props.handleUpdate(post);
    }
    this.setState({ editable: !this.state.editable });
  }

  updateComments = (comment) => {
    var comments = this.state.comments.filter((c) => {
      return c.id != comment.id;
    });
    comments.push(comment);
    this.setState({ comments: comments })
  }

  removeComment = (id) => {
    var newComments = this.state.comments.filter((comment) => {
      return comment.id != id;
    });
    this.setState({ comments: newComments });
  }

  handleCommentUpdate = (comment) => {
    $.ajax({
      url: `/api/comments/${comment.id}`,
      type: 'PUT',
      data: { comment: comment },
      success: (comment) => {
        this.updateComments(comment);
      }
    });
  }

  handleCommentDelete = (id) => {
    $.ajax({
      url: `/api/comments/${id}`,
      type: 'DELETE',
      success: () => {
        this.removeComment(id);
      }
    });
  }

  render() {
    var user_id = this.state.editable ? <input type='text' ref='user_id' defaultValue={this.props.post.user_id} />
                                   : <h1>{this.props.post.user_id}</h1>;
    var body = this.state.editable ? <textarea ref='body' defaultValue={this.props.post.body} cols="40" rows="5"/>
                                   : <p>{this.props.post.body}</p>;

      return (
        <div>
          <div className="container">
            <div>
              <div>{user_id}</div>
              <button className="delete-button" onClick={this.props.handleDelete}>Delete</button>
              <button className="edit-button" onClick={this.handlePostEdit.bind(this)}>{this.state.editable ? 'Submit' : 'Edit' }</button>
            </div>
            <div>{body}</div>
          </div>
          <div className="comment-section">
            <AllComments comments={this.state.comments} handleDelete={this.handleCommentDelete}
                                                        handleUpdate={this.handleCommentUpdate}
                                                        post_id={this.props.post.id}/>
            <NewComment handleSubmit={this.updateComments} post_id={this.props.post.id}/>
          </div>
        </div>
      );
    }
}
