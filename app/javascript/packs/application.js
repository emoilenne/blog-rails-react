import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import Main from './components/main'


render((
  <HashRouter>
    <Route component={Main} />
  </HashRouter>), document.getElementById('main'))
