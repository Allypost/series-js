import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { css } from 'emotion';

import { register } from '../services/auth';
import state from '../state';

import eyeImg from '../img/ic-akcije-show-password-red@3x.png';
import { doLogin } from './LoginContainer';

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

@observer
export class RegisterContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showPassword: false,
      logMeIn: true,
    };

    this.handlePasswordToggleClick = this.handlePasswordToggleClick.bind(this);
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
    this.setState({ logMeIn: event.target.checked });
  }

  handleLogin(evt) {
    evt.preventDefault();

    register(state, this.state)
      .then((data) => {
        if (!data._id) {
          alert('Something went wrong. Please try again');
          return data;
        }

        const { logMeIn } = this.state;

        if (!logMeIn) {
          const { history } = this.props;

          if (history && history.push) {
            history.push('/');
          } else {
            window.location.href = '/';
          }

          return data;
        }

        doLogin(state, this.state, this.props);
        return data;
      });

    return false;
  }

  handlePasswordToggleClick(evt) {
    const { showPassword } = this.state;

    this.setState({ showPassword: !showPassword });

    evt.preventDefault();
  }

  render() {
    const {
      email,
      password,
      logMeIn,
      showPassword,
    } = this.state;

    const { register: isLoading } = state.loadingStates;

    return (
      <div className={loginContainer}>
        <form
          method="POST"
          onSubmit={this.handleLogin}
        >
          <label className={css`cursor: pointer;`}>
            <span>
              My username will be
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
            <span>
              and my password will be
            </span>
            <div className={passwordContainer}>
              <input
                className={cssPassword}
                onChange={this.handlePasswordChange}
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
          <div>
            <label className={cssRemember}>
              <input
                defaultChecked={logMeIn}
                onChange={this.handleRememberChange}
                type="checkbox"
              />
              Log me in
            </label>
            <button
              className={cssSubmit}
              onClick={this.handleLogin}
              type="submit"
            >
              {
                isLoading ? 'Registering...' : 'Register'
              }
            </button>
          </div>
        </form>
        <div className={loginFooter}>
          <div>
            <span>
              Already have an account?
            </span>
            <Link
              // eslint-disable-next-line
              className={cssRegisterLink}
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

}