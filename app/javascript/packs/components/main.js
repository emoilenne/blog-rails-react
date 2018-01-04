import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './header'
import Home from './home'

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
      <Home
        match={props.match}
        receiveTag
        userId={this.state.userId}
      />))
    const componentPostsFromUser = (props => (
      <Home
        match={props.match}
        receiveUser
        userId={this.state.userId}
      />))
    const componentHomePage = () => <Home userId={this.state.userId} />
    return (
      <div>
        <div>{header}</div>
        <Switch>
          <Route path="/tags/:tag" component={componentPostsWithTag} />
          <Route path="/users/:username" component={componentPostsFromUser} />
          <Route component={componentHomePage} />
        </Switch>
      </div>
    )
  }
}
