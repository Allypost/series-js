import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { IndexContainer } from './IndexContainer';
import { ShowsContainer } from './ShowsContainer';
import { NotFoundContainer } from './NotFoundContainer';
import { NavBar } from './components/NavBar';

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

/* eslint-disable react/jsx-max-depth */
ReactDOM.render(
  (
    <div>
      <Router>
        <div>
          <NavBar />
          <div className="content-wrapper container">
            <Switch>
              {
                routes
                  .map((routeData) =>
                    (
                      <Route
                        key={routeData.path || '__'}
                        {...routeData}
                      />
                    ))
              }
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  ),
  document.querySelector('.js-app')
);
/* eslint-enable react/jsx-max-depth */
