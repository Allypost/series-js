import { Component } from 'react';
import state from '../state';

export class LogoutContainer extends Component {

  componentDidMount() {
    Object.keys(state.user)
      .forEach((key) => {
        delete state.user[key];
      });

    window.location.href = '/';
  }

  render() {
    return null;
  }

}
