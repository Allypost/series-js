import React from 'react';
import { configure } from 'mobx';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { css, injectGlobal } from 'emotion';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import state from './state';

import { IndexContainer } from './containers/IndexContainer';
import { ShowContainer } from './containers/ShowContainer';
import { ShowContainerModal } from './containers/ShowContainerModal';
import { NavBar } from './containers/NavBar';
import { Footer } from './containers/Footer';
import { LoginContainer } from './containers/LoginContainer';
import { LogoutContainer } from './containers/LogoutContainer';
import { RegisterContainer } from './containers/RegisterContainer';
import { EpisodeContainer } from './containers/EpisodeContainer';
import { LoginContainerModal } from './containers/LoginContainerModal';

const routes = [
  {
    component: IndexContainer,
    path: '/',
    exact: true,
  },
  {
    component: ShowContainer,
    path: '/show/:showId',
  },
  {
    component: ShowContainerModal,
    path: '/show/:showId/add-episode',
    exact: true,
  },
  {
    component: EpisodeContainer,
    path: '/episode/:episodeId',
    exact: true,
  },
  {
    component: LoginContainer,
    path: '/login',
    exact: true,
  },
  {
    component: RegisterContainer,
    path: '/register',
    exact: true,
  },
  {
    component: LogoutContainer,
    path: '/logout',
    exact: true,
  },
];

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Avenir, Nunito, "Comic Sans MS", cursive, sans-serif;
    font-size: 16px;
  }

  html {
    height: 100%;
  }

  body {
    min-height: 100%;
  }

  a, a:visited, a:active {
    cursor: pointer;
    color: #ff758c;
    text-decoration: none;
  },

  a:hover {
    text-decoration: underline;
  }
`;

const wrapper = css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: [nav] 1fr [body] 8fr [footer] 1fr;
  height: 100vh;
`;

configure({ enforceActions: true });

/* eslint-disable react/jsx-max-depth */
ReactDOM.render(
  (
    <Provider state={state}>
      <Router>
        <div className={wrapper}>
          <NavBar />
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
          <Footer />
          <LoginContainerModal />
        </div>
      </Router>
    </Provider>
  ),
  document.querySelector('.js-app')
);
/* eslint-enable react/jsx-max-depth */
