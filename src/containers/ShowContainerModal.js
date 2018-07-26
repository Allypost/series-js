import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

import { Modal } from '../components/_global/Modal';
import { AddEpisode } from '../components/ShowContainer/Show/AddEpisode';

@inject('state')
@observer
export class ShowContainerModal extends Component {

  @action.bound
  handleClose() {
    const { history } = this.props;

    history.push('./');
  }

  render() {
    return (
      <Modal
        onClose={this.handleClose}
      >
        <AddEpisode
          onClose={this.handleClose}
          show
        />
      </Modal>
    );
  }

}
