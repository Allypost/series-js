import React, { Component } from 'react';
import { css } from 'emotion';

const customInput = css`
  border: none;
  outline: none;
  border-bottom: 1px solid #ff758c;
`;

export class LoginContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLogin(evt) {
    evt.preventDefault();

    const { email, password } = this.state;


    this.fetchToken({ email, password });

    return false;
  }

  fetchToken({ email, password }) {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };

    this.setState({ isLoading: true });

    return fetch('https://api.infinum.academy/api/users/sessions', opts)
      .then((resp) => resp.json())
      .then((resp) => resp.data)
      .then(({ token }) => {
        localStorage.setItem('token', token);

        return token;
      })
      .catch((error) => console.warn(error))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { email, password, isLoading } = this.state;

    return (
      <form
        method="POST"
        onSubmit={this.handleLogin}
      >
        <div>
          <label>
            <span>
              Email
            </span>
            <input
              className={customInput}
              onChange={this.handleUsernameChange}
              type="text"
              value={email}
            />
          </label>
        </div>
        <div>
          Password
          &nbsp;
          <input
            className={customInput}
            onChange={this.handlePasswordChange}
            type="password"
            value={password}
          />
        </div>
        <button
          onClick={this.handleLogin}
          type="submit"
        >
          {
            isLoading ? 'Logging in...' : 'Login'
          }
        </button>
      </form>
    );
  }

}
