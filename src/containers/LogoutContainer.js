import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

@inject('state')
@observer
export class LogoutContainer extends Component {

  @action
  componentDidMount() {
    const { state } = this.props;
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
