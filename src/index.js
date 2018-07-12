import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { IndexContainer } from './IndexContainer';
import { NotFoundContainer } from './NotFoundContainer';

ReactDOM.render(
  (
    <Router>
      <Switch>
        <Route
          component={IndexContainer}
          exact
          path='/'
        />
        <Route
          component={NotFoundContainer}
        />
      </Switch>
    </Router>
  ),
  document.querySelector('.js-app')
);
