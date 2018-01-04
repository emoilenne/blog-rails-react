import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CommentsWrapper from './comments_wrapper'

export default class Post extends Component {
  constructor() {
    super()
    this.state = { editable: false, username: "", liked: false, likeId: -1 }
  }

  setUsername = (userId) => {
    $.getJSON(`/api/users/${userId}`, (user) => { this.setState({username: user.name}) })
  }

  componentDidMount() {
    this.setUsername(this.props.post.user_id)
    $.getJSON(`/api/posts/${this.props.post.id}/likes`, (likes) => {
      var like = likes.find(like => like.user_id == this.props.userId)
      if (like) {
        this.setState({liked: true, likeId: like.id})
      }
    })
  }

  handleEdit = ()  => {
    if (this.state.editable) {
      var id = this.props.post.id
      var body = this.refs.body.value
      var post = {id, user_id: this.props.userId, body}
      this.props.handleUpdate(post)
      this.setUsername(this.props.userId)
      this.setState({ editable: false })
    }
    else {
      this.setState({ editable: true })
    }
  }

  likePost = () => {
    if (this.state.liked) {
      $.ajax({
        url: `/api/likes/${this.state.likeId}`,
        type: 'DELETE',
        success: () => {
          this.setState({liked: false, likeId: -1})
        }
      })
    }
    else {
      var post_id =
      $.ajax({
        url: '/api/likes',
        type: 'POST',
        data: { like: {post_id: this.props.post.id, user_id: this.props.userId} },
        success: (like) => {
          this.setState({liked: true, likeId: like.id})
        }
      })
    }
  }

  render() {
    var dateFormat = require('dateformat')
    var bodyText = this.props.post.body
    var tagRegex = /#\w+/g
    // insert tag links
    if (!this.state.editable) {
      var tags = bodyText.match(tagRegex)
      if (tags){
        var bodySplittedText = bodyText.split(tagRegex)
        bodyText = [bodySplittedText[0]]
        tags.map((tag, index) => {
          var tag_name = tag.substr(1)
          bodyText.push(<Link to={`/tags/${tag_name}`} key={`${tag_name}`}>{tag}</Link>)
          bodyText.push(bodySplittedText[index + 1])
        })
      }
    }
    var updatedAt = dateFormat(new Date(this.props.post.updated_at), "HH:MM dd-mm-yyyy")
    var body = this.state.editable ? <textarea ref='body' defaultValue={this.props.post.body} cols="40" rows="5"/>
                                   : <p>{bodyText}</p>
    var editButton = this.props.userId == -1 ? false : <button className="edit-button" onClick={this.handleEdit}>{this.state.editable ? 'Submit' : 'Edit' }</button>
    var likeButton = this.props.userId == -1 ? false : <button className="like-button" onClick={this.likePost}>{this.state.liked ? '❤' : '♡'}</button>
    return (
      <div>
        <div className="container">
          <div>
            { !this.state.editable &&
              <div><h3>{this.state.username}</h3><h6>{updatedAt}</h6></div>
            }
            <button className="delete-button" onClick={this.props.handleDelete}>Delete</button>
            {editButton}
          </div>
          <div>{body}</div>
          {likeButton}
        </div>
          <CommentsWrapper
            post_id={this.props.post.id}
            userId={this.props.userId}/>
      </div>
    )
    }
}
