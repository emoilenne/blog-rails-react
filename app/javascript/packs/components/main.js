import React, { Component } from 'react'
import Header from './header'
import Home from './home'
import AllAlerts from './all_alerts'
import { Route, Switch } from 'react-router-dom'

export default class Main extends Component {
  constructor() {
    super()
    this.state = { username: "", userId: -1 }
  }

  login = (userId, username) => {
    this.setState({userId, username})
  }

  render() {
    return (
      <div>
        <Header login={this.login} username={this.state.username}/>
        <Switch>
          <Route path='/tags/:tag' component={(props) => { return <Home match={props.match}
                                                                        receiveTag={true}
                                                                        userId={this.state.userId} /> }}/>
          <Route component={() => { return <Home userId={this.state.userId} /> }} />
        </Switch>
      </div>
    )
  }
}
