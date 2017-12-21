import React from 'react';
import { render } from 'react-dom';
import Main from './components/main'
import { HashRouter, Route } from 'react-router-dom';


render((<HashRouter>
          <Route component={Main} />
        </HashRouter>), document.getElementById("main"))
