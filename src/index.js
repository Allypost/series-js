import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { IndexContainer } from './IndexContainer';

ReactDOM.render(
  (
    <Router>
      <Route
        component={IndexContainer}
        exact
        path='/'
      />
    </Router>
  ),
  document.querySelector('.js-app')
);
