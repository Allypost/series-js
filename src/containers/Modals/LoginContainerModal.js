import { observer, inject } from 'mobx-react';
import React, { Component } from 'react';
import { action } from 'mobx';

import { Modal } from '../../components/_global/Modal';
import { LoginContainer } from '../LoginContainer';

@inject('state')
@observer
export class LoginContainerModal extends Component {

  @action.bound
  handleClose(evt) {
    evt.preventDefault();

    const { state } = this.props;
    const { modalStates } = state;

    modalStates.login = false;
  }

  @action.bound
  handleLogin(success) {
    if (!success) {
      alert('Invalid credentials!');
      return;
    }

    const { state } = this.props;
    const { modalStates } = state;

    modalStates.login = false;
  }

  render() {
    const { state } = this.props;
    const { modalStates } = state;
    const { login: show } = modalStates;

    if (!show) {
      return null;
    }

    return (
      <Modal onClose={this.handleClose}>
        <LoginContainer onLogin={this.handleLogin} />
      </Modal>
    );
  }

}
