import React from 'react';
import { css } from 'emotion';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { IndexContainer } from './IndexContainer';
import { ShowContainer } from './ShowContainer';
import { EpisodeContainer } from './EpisodeContainer';
import { NotFoundContainer } from './NotFoundContainer';
import { NavBar } from './components/NavBar';
import { LoginContainer } from './LoginContainer';

const routes = [
  {
    component: IndexContainer,
    path: '/',
    exact: true,
  },
  {
    component: ShowContainer,
    path: '/show/:showId',
    exact: true,
  },
  {
    component: EpisodeContainer,
    path: '/show/:showId/episode/:episodeId',
    exact: true,
  },
  {
    component: LoginContainer,
    path: '/login',
    exact: true,
  },
  {
    component: NotFoundContainer,
  },
];

const wrapper = css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: [nav] 1fr [body] 8fr [footer] 1fr;
  height: 100vh;
`;

/* eslint-disable react/jsx-max-depth */
ReactDOM.render(
  (
    <div>
      <Router>
        <div className={wrapper}>
          <NavBar />
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
      </Router>
    </div>
  ),
  document.querySelector('.js-app')
);
/* eslint-enable react/jsx-max-depth */
