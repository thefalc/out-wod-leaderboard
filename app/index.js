// import React from 'react';
// import { render } from 'react-dom';

// import App from './components/App';

// render(<App />, document.getElementById('app'));

import React from 'react'
import ReactDOM from 'react-dom';
import { Router } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

const history = createBrowserHistory()

// Routes
import routes from './routes'

const Routes = (
  <Router history={history}>
    { routes }
  </Router>
)

const app = document.getElementById('app')

ReactDOM.render(Routes, app);