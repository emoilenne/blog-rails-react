import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './header'
import PostsWrapper from './posts_wrapper'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      userId: -1,
    }
  }

  login = (userId, username) => {
    this.setState({ userId, username })
  }

  render() {
    const header = <Header login={this.login} username={this.state.username} />
    const componentPostsWithTag = (props => (
      <PostsWrapper
        match={props.match}
        receiveTag
        userId={this.state.userId}
      />))
    const componentPostsFromUser = (props => (
      <PostsWrapper
        match={props.match}
        receiveUser
        userId={this.state.userId}
      />))
    const componentHomePage = () => <PostsWrapper userId={this.state.userId} />
    return (
      <div>
        <div className="header">{header}</div>
        <div className="body">
          <Switch>
            <Route path="/tags/:tag" component={componentPostsWithTag} />
            <Route path="/users/:username" component={componentPostsFromUser} />
            <Route component={componentHomePage} />
          </Switch>
        </div>
      </div>
    )
  }
}
