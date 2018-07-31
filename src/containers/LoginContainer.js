import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { css } from 'emotion';
import { action, observable } from 'mobx';

import { login } from '../services/auth';

import eyeImg from '../img/ic-akcije-show-password-red@3x.png';
import { Checkbox } from '../components/_global/Inputs/Checkbox';

const loginContainer = css`
  display: grid;
  height: 100%;
  grid-column: 5 / span 4;
  grid-row-gap: 1em;
  grid-row: body;
  font-size: 1.8em;
  color: #424242;
  align-self: center;
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
  display: inline-block;
  cursor: pointer;
  font-size: .5em;
  margin-bottom: 2em;
`;

const cssSubmit = css`
  display: block;
  cursor: pointer;
  background-color: #ff758c;
  color: #fff;
  font-size: .55em;
  text-transform: uppercase;
  padding: .7em 5em;
  border: none;
  border-radius: .35em;
`;

const loginFooter = css`
  display: grid;
  font-size: .5em;
  align-items: baseline;
  color: #757575;
`;

const cssRegisterLink = css`
  padding: 0 1em;
`;

const passwordContainer = css`
  position: relative;
  display: inline-block;
`;

const eyeImage = css`
  position: absolute;
  top: 0;
  right: 0;
  height: 1.2em;
`;

const inputLabel = css`
  display: block;
`;

const labelContainer = css`
  display: block;
  cursor: pointer;
`;

const formContainer = css`
  align-self: center;
`;

const submitContainer = css`
  margin-top: .5em;
`;

const defaultCallback = (props, token) => {
  if (!token) {
    alert('Invalid credentials');
    return token;
  }

  const { history } = props;

  if (history && history.push) {
    history.push('/');
  } else {
    window.location.href = '/';
  }

  return token;
};

export function doLogin(appState, data, props, callback = null) {
  return login(appState, data)
    .then((token) => {
      const cb = callback || defaultCallback.bind(this, props);

      return cb(token);
    });
}

@inject('state')
@observer
export class LoginContainer extends Component {

  @observable
  componentState = {
    email: '',
    password: '',
    showPassword: false,
    rememberMe: true,
  };

  @action.bound
  handleInputChange(inputName, inputValue = 'value') {
    return action((evt) => {
      const { [inputValue]: value } = evt.target;

      this.componentState[inputName] = value;
    });
  }

  @action.bound
  handleLogin(evt) {
    evt.preventDefault();

    const { state } = this.props;
    const { onLogin } = this.props;

    doLogin(state, this.componentState, this.props, onLogin);

    return false;
  }

  @action.bound
  handlePasswordToggleClick(evt) {
    evt.preventDefault();

    const { componentState } = this;

    componentState.showPassword = !componentState.showPassword;
  }

  render() {
    const {
      email,
      password,
      rememberMe,
      showPassword,
    } = this.componentState;

    const { state } = this.props;
    const { login: isLoading } = state.loadingStates;

    return (
      <div className={loginContainer}>
        <form
          className={formContainer}
          method="POST"
          onSubmit={this.handleLogin}
        >
          <label className={labelContainer}>
            <span className={inputLabel}>
              My username is
            </span>
            <input
              className={cssUsername}
              onChange={this.handleInputChange('email')}
              required
              type="email"
              value={email}
            />
          </label>
          <label className={labelContainer}>
            <span className={inputLabel}>
              and my password is
            </span>
            <div className={passwordContainer}>
              <input
                className={cssPassword}
                onChange={this.handleInputChange('password')}
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
              />
              <a
                href="#reveal-password"
                onClick={this.handlePasswordToggleClick}
              >
                <img
                  alt="Reveal password"
                  className={eyeImage}
                  src={eyeImg}
                />
              </a>
            </div>
          </label>
          <div className={submitContainer}>
            <Checkbox
              className={cssRemember}
              defaultChecked={rememberMe}
              onChange={this.handleInputChange('rememberMe', 'checked')}
            >
              Remember me
            </Checkbox>
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
