import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import Main from './components/main'
import AllAlerts from './components/all_alerts'


render((
  <HashRouter>
    <Route component={Main} />
  </HashRouter>), document.getElementById('main'))
render(<AllAlerts />, document.getElementById('alerts'))
