import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CommentsWrapper from './comments_wrapper'

export default class Post extends Component {
  constructor() {
    super()
    this.state = { editable: false, username: "" }
  }

  componentDidMount() {
    $.getJSON(`/api/users/${this.props.post.user_id}`, (response) => { this.setState({username: response.name}) })
  }

  handleEdit = ()  => {
    if (this.state.editable) {
      var id = this.props.post.id
      var username = this.refs.username.value
      var body = this.refs.body.value
      this.props.userExistsOrCreate(username, (user) => {
        var post = {id, user_id: user.id, body}
        this.props.handleUpdate(post)
        this.setState({ editable: false, username })
      })
    }
    else {
      this.setState({ editable: true })
    }
  }

  createTags = (tags) => {
    tags.map((name) => {
      name = name.substr(1)
      $.getJSON(`/api/tags/name/${name}`, (response) => {
        if (!response) {
          $.ajax({
            url: '/api/tags',
            type: 'POST',
            data: { tag: {name} }
          })
        }
      })
    })
  }

  render() {
    var dateFormat = require('dateformat')
    var bodyText = this.props.post.body
    var tagRegex = /#\w+/g
    // insert tag links
    if (!this.state.editable) {
      var tags = bodyText.match(tagRegex)
      if (tags){
        this.createTags(tags)
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
    var user = this.state.editable ? <input type='text' ref='username' defaultValue={this.state.username} />
                                   : <div><h3>{this.state.username}</h3><h6>{updatedAt}</h6></div>
    var body = this.state.editable ? <textarea ref='body' defaultValue={this.props.post.body} cols="40" rows="5"/>
                                   : <p>{bodyText}</p>

      return (
        <div>
          <div className="container">
            <div>
              <div>{user}</div>
              <button className="delete-button" onClick={this.props.handleDelete}>Delete</button>
              <button className="edit-button" onClick={this.handleEdit}>{this.state.editable ? 'Submit' : 'Edit' }</button>
            </div>
            <div>{body}</div>
          </div>
            <CommentsWrapper
              post_id={this.props.post.id}
              userExistsOrCreate={this.props.userExistsOrCreate}/>
        </div>
      )
    }
}
