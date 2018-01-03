import React, { Component } from 'react'
import Header from './header'
import Home from './home'
import AllAlerts from './all_alerts'
import TagPosts from './tag_posts'
import { Route, Switch } from 'react-router-dom'

export default class Main extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route path='/home' component={() => { return <Home postsLink='/api/posts' newPostEnabled={true} /> }}/>
          <Route path='/tags/:tag' component={TagPosts}/>
        </Switch>
      </div>
    )
  }
}
