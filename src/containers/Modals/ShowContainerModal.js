import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

import { Modal } from '../../components/_global/Modal';
import { AddEpisode } from '../../components/ShowContainer/Show/AddEpisode';
import { add as addEpisode } from '../../services/episode';
import { uploadFile } from '../../services/media';

@inject('state')
@observer
export class ShowContainerModal extends Component {

  get showId() {
    const { match } = this.props;
    const { params } = match;
    const { showId } = params;

    return showId;
  }

  @action.bound
  handleClose(evt) {
    evt.preventDefault();

    const { history } = this.props;

    history.push('./');
  }

  @action.bound
  handleAddEpisode(evt, data) {
    evt.preventDefault();

    const { history } = this.props;
    const { state } = this.props;
    const { user } = state;
    const { token } = user;

    const postData = {
      showId: this.showId,
      mediaId: data.mediaId,
      title: data.title,
      description: data.description,
      episodeNumber: String(data.episode),
      season: String(data.season),
    };

    addEpisode(state, token, postData)
      .then((success) => {
        if (success) {
          history.push('./');
        } else {
          alert('Something went wrong. Please try again.');
        }
      });
  }

  @action.bound
  handleImage(image) {
    const { state } = this.props;
    const { user } = state;
    const { token } = user;

    const form = new FormData();
    form.append('file', image);

    return uploadFile(form, token);
  }

  render() {
    const { state } = this.props;
    const { loadingStates } = state;

    const { addEpisode: isLoading } = loadingStates;

    return (
      <Modal
        onClose={this.handleClose}
      >
        <AddEpisode
          isLoading={isLoading}
          onAdd={this.handleAddEpisode}
          onClose={this.handleClose}
          onImage={this.handleImage}
          show
        />
      </Modal>
    );
  }

}
