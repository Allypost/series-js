import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import ShowContainer from './ShowContainer';

ReactDOM.render(
  (
    <Router>
      <Route
        component={ShowContainer}
        exact
        path='/'
      />
    </Router>
  ),
  document.querySelector('.js-app')
);
