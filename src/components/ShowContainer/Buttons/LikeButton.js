import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

import { like as likeShow } from '../../../services/show';

import { ActionButton } from '../../_global/Buttons/ActionButton';

@inject('state')
@observer
export class LikeButton extends Component {

  @action.bound
  handleClick(evt) {
    evt.preventDefault();

    const { state } = this.props;
    const { loadingStates } = state;
    const { showLike: isLoading } = loadingStates;
    const { disabled: isDisabled } = this.props;

    if (isDisabled || isLoading) {
      return;
    }

    const { showData = {} } = state;

    likeShow(state, showData._id);
  }

  render() {
    const { likesCount } = this.props;
    const { state } = this.props;
    const { loadingStates } = state;
    const { showLike: isLoading } = loadingStates;
    const { disabled: isDisabled } = this.props;

    return (
      <ActionButton
        disabled={isDisabled}
        likesCount={likesCount}
        loading={isLoading}
        onClick={this.handleClick}
      />
    );
  }

}
