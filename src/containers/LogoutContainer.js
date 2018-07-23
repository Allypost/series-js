import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';

@inject('state')
@observer
export class LogoutContainer extends Component {

  componentDidMount() {
    runInAction(() => {
      const { state } = this.props;
      Object.keys(state.user)
        .forEach((key) => {
          delete state.user[key];
        });
    });

    window.location.href = '/';
  }

  render() {
    return null;
  }

}
