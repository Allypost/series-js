import React from 'react';
import { css, injectGlobal } from 'emotion';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { IndexContainer } from './containers/IndexContainer';
import { ShowContainer } from './containers/ShowContainer';
import { NotFoundContainer } from './containers/NotFoundContainer';
import { NavBar } from './components/_global/NavBar';
import { Footer } from './components/_global/Footer';
import { LoginContainer } from './containers/LoginContainer';
import { LogoutContainer } from './containers/LogoutContainer';
import { RegisterContainer } from './containers/RegisterContainer';

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
  {
    component: NotFoundContainer,
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
          <Footer />
        </div>
      </Router>
    </div>
  ),
  document.querySelector('.js-app')
);
/* eslint-enable react/jsx-max-depth */
