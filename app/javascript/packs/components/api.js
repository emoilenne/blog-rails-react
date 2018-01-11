import React from 'react'

export default class API extends React.Component {
  static createUser = (name, callOnSuccess) => {
    window.alerts.removeAll()
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { name } }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(newUser => callOnSuccess(newUser))
        } else {
          response.json()
            .then((errors) => {
              throw Object.keys(errors).map(key => errors[key].map(error => `${key} ${error}`).join(', ')).join(', ')
            })
            .catch(error => window.alerts.addMessage({
              text: `Cannot create a user with name "${name}": ${error}`,
              type: 'error',
            }))
        }
      })
  }

  static getUserById = (id, callOnSuccess) => {
    window.alerts.removeAll()
    fetch(`/api/users/${id}`)
      .then(response => response.json())
      .then(user => callOnSuccess(user))
      .catch(error => window.alerts.addMessage({
        text: `Cannot get the username: ${error}`,
        type: 'error',
      }))
  }

  static getUserByName = (name, callOnSuccess) => {
    window.alerts.removeAll()
    fetch(`/api/users/find?name=${name}`)
      .then(response => response.json())
      .then(user => callOnSuccess(user))
      .catch(error => window.alerts.addMessage({
        text: `Cannot get the username "${name}": ${error}`,
        type: 'error',
      }))
  }

  static createComment = (comment, callOnSuccess) => {
    window.alerts.removeAll()
    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(newComment => callOnSuccess(newComment))
        } else {
          response.json()
            .then((errors) => {
              throw Object.keys(errors).map(key => errors[key].map(error => `${key} ${error}`).join(', ')).join(', ')
            })
            .catch(error => window.alerts.addMessage({
              text: `Cannot create a comment: ${error}`,
              type: 'error',
            }))
        }
      })
  }

  static updateComment = (comment, callOnSuccess) => {
    window.alerts.removeAll()
    fetch(`/api/comments/${comment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(newComment => callOnSuccess(newComment))
        } else {
          response.json()
            .then((errors) => {
              throw Object.keys(errors).map(key => errors[key].map(error => `${key} ${error}`).join(', ')).join(', ')
            })
            .catch(error => window.alerts.addMessage({
              text: `Cannot update the comment: ${error}`,
              type: 'error',
            }))
        }
      })
  }

  static deleteComment = (comment, callOnSuccess) => {
    window.alerts.removeAll()
    fetch(`/api/comments/${comment.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => callOnSuccess())
      .catch(error => window.alerts.addMessage({
        text: `Cannot delete the comment: ${error}`,
        type: 'error',
      }))
  }

  static createPost = (post, callOnSuccess) => {
    window.alerts.removeAll()
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(newPost => callOnSuccess(newPost))
        } else {
          response.json()
            .then((errors) => {
              throw Object.keys(errors).map(key => errors[key].map(error => `${key} ${error}`).join(', ')).join(', ')
            })
            .catch(error => window.alerts.addMessage({
              text: `Cannot create a post: ${error}`,
              type: 'error',
            }))
        }
      })
  }

  static updatePost = (post, callOnSuccess) => {
    window.alerts.removeAll()
    fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(newPost => callOnSuccess(newPost))
        } else {
          response.json()
            .then((errors) => {
              throw Object.keys(errors).map(key => errors[key].map(error => `${key} ${error}`).join(', ')).join(', ')
            })
            .catch(error => window.alerts.addMessage({
              text: `Cannot update the post: ${error}`,
              type: 'error',
            }))
        }
      })
  }

  static deletePost = (post, callOnSuccess) => {
    window.alerts.removeAll()
    fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => callOnSuccess())
      .catch(error => window.alerts.addMessage({
        text: `Cannot delete the post: ${error}`,
        type: 'error',
      }))
  }

  static getPosts = (offset, sortBy, sortType, callOnSuccess) => {
    window.alerts.removeAll()
    fetch(`/api/posts?sort=${sortBy}&type=${sortType}&offset=${offset}`)
      .then(response => response.json())
      .then(posts => callOnSuccess(posts))
      .catch((error) => {
        window.alerts.addMessage({
          text: `Cannot get posts: ${error}`,
          type: 'error',
        })
      })
  }

  static getPostsForTag = (tag, offset, sortBy, sortType, callOnSuccess) => {
    window.alerts.removeAll()
    fetch(`/api/posts?sort=${sortBy}&type=${sortType}&tag=${tag}&offset=${offset}`)
      .then(response => response.json())
      .then(posts => callOnSuccess(posts))
      .catch((error) => {
        window.alerts.addMessage({
          text: `Cannot get posts: ${error}`,
          type: 'error',
        })
      })
  }

  static getPostsForUsername = (username, offset, sortBy, sortType, callOnSuccess) => {
    window.alerts.removeAll()
    fetch(`/api/posts?sort=${sortBy}&type=${sortType}&username=${username}&offset=${offset}`)
      .then(response => response.json())
      .then(posts => callOnSuccess(posts))
      .catch((error) => {
        window.alerts.addMessage({
          text: `Cannot get posts: ${error}`,
          type: 'error',
        })
      })
  }

  static getCommentsOfPost = (id, callOnSuccess) => {
    window.alerts.removeAll()
    fetch(`/api/posts/${id}/comments`)
      .then(response => response.json())
      .then(comments => callOnSuccess(comments))
      .catch(error => window.alerts.addMessage({
        text: `Cannot get comments of the post: ${error}`,
        type: 'error',
      }))
  }

  static getLikesOfPost = (id, callOnSuccess) => {
    window.alerts.removeAll()
    fetch(`/api/posts/${id}/likes`)
      .then(response => response.json())
      .then(likes => callOnSuccess(likes))
      .catch(error => window.alerts.addMessage({
        text: `Cannot get likes of the post: ${error}`,
        type: 'error',
      }))
  }


  static likePost = (post_id, user_id, callOnSuccess) => {
    window.alerts.removeAll()
    fetch('/api/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ like: { post_id, user_id } }),
    })
      .then(response => response.json())
      .then(like => callOnSuccess(like))
      .catch(error => window.alerts.addMessage({
        text: `Cannot like the post: ${error}`,
        type: 'error',
      }))
  }

  static dislikePost = (likeId, callOnSuccess) => {
    window.alerts.removeAll()
    fetch(`/api/likes/${likeId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => callOnSuccess())
      .catch(error => window.alerts.addMessage({
        text: `Cannot remove like: ${error}`,
        type: 'error',
      }))
  }
}
