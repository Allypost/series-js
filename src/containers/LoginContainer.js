import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { login } from '../services/auth';
import state from '../state';
import { observer } from 'mobx-react';

const loginContainer = css`
  display: grid;
  grid-column: 5 / span 4;
  grid-row: body;
  font-size: 1.8em;
  line-height: 2em;
  color: #424242;
`;

const cssUsername = css`
  display: block;
  font-size 1em;
  border: none;
  outline: none;
  color: #ff758c;
  border-bottom: 2px solid #ff758c;
  font-kerning: normal;
`;

const cssPassword = css`
  ${cssUsername}
  letter-spacing: .31415em;
  font-weight: 800;
`;

const cssRemember = css`
  font-size: .5em;
  cursor: pointer;
  display: inline-block;
`;

const cssSubmit = css`
  display: block;
  cursor: pointer;
  background-color: #ff758c;
  color: #fff;
  font-size: .55em;
  font-variant: all-small-caps;
  padding: .69em 5em;
  border: none;
  border-radius: .35em;
`;

const loginFooter = css`
  display: grid;
  font-size: .5em;
  grid-row: footer;
  align-items: end;
  color: #757575;
`;

const cssRegisterLink = css`
  padding: 0 1em;
`;

@observer
export class LoginContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: true,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRememberChange = this.handleRememberChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleRememberChange(event) {
    this.setState({ rememberMe: event.target.checked });
  }

  handleLogin(evt) {
    evt.preventDefault();

    login(state, this.state)
      .then((token) => {
        if (!token) {
          alert('Invalid credentials');
          return token;
        }

        window.location.href = '/';

        return token;
      });

    return false;
  }

  render() {
    const {
      email,
      password,
      rememberMe,
    } = this.state;

    const { login: isLoading } = state.loadingStates;

    return (
      <div className={loginContainer}>
        <form
          method="POST"
          onSubmit={this.handleLogin}
        >
          <label className={css`cursor: pointer;`}>
            <span>
              My username is
            </span>
            <input
              className={cssUsername}
              onChange={this.handleUsernameChange}
              required
              type="email"
              value={email}
            />
          </label>
          <label className={css`cursor: pointer;`}>
            and my password is
            &nbsp;
            <input
              className={cssPassword}
              onChange={this.handlePasswordChange}
              required
              type="password"
              value={password}
            />
          </label>
          <div>
            <label className={cssRemember}>
              <input
                defaultChecked={rememberMe}
                onChange={this.handleRememberChange}
                type="checkbox"
              />
              Remember me
            </label>
            <button
              className={cssSubmit}
              onClick={this.handleLogin}
              type="submit"
            >
              {
                isLoading ? 'Logging in...' : 'Login'
              }
            </button>
          </div>
        </form>
        <div className={loginFooter}>
          <div>
            <span>
              Still don&apos;t have an account?
            </span>
            <Link
              // eslint-disable-next-line
              className={cssRegisterLink}
              to="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

}
