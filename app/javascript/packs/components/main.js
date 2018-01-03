import React, { Component } from 'react'
import Header from './header'
import Home from './home'
import AllAlerts from './all_alerts'
import { Route, Switch } from 'react-router-dom'

export default class Main extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/tags/:tag' component={(props) => { return <Home match={props.match} receiveTag={true} /> }}/>
        </Switch>
      </div>
    )
  }
}
