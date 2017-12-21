import React, { Component } from 'react';
import Header from './header';
import Home from './home';
import { Route, Switch } from 'react-router-dom'

export default class Main extends Component {
  handleLogin = (user) => {
    this.setState(user)
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route path='/home' component={Home}/>
        </Switch>
      </div>
    )
  }
}
