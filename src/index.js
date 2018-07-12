import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { IndexContainer } from './IndexContainer';
import { ShowsContainer } from './ShowsContainer';
import { NotFoundContainer } from './NotFoundContainer';

const routes = [
  {
    component: IndexContainer,
    path: '/',
    exact: true,
  },
  {
    component: ShowsContainer,
    path: '/show/:showId',
    exact: true,
  },
  {
    component: NotFoundContainer,
  },
];

ReactDOM.render(
  (
    <Router>
      <Switch>
        {
          routes
            .map((routeData) =>
              (
                <Route
                  key="path"
                  {...routeData}
                />
              ))
        }
      </Switch>
    </Router>
  ),
  document.querySelector('.js-app')
);
