import { Component } from 'react';

export class LogoutContainer extends Component {

  componentDidMount() {
    const tokenStore = this.getTokenStore();

    if (tokenStore) {
      tokenStore.removeItem('token');
      tokenStore.removeItem('token_location');
    }

    window.location.href = '/';
  }

  // eslint-disable-next-line class-methods-use-this
  getTokenStore() {
    const tokenLocation = window.localStorage.getItem('token_location');

    switch (tokenLocation) {
      case 'localStorage':
        return window.localStorage;
      case 'sessionStorage':
        return window.sessionStorage;
      default:
        return null;
    }
  }

  render() {
    return null;
  }

}
