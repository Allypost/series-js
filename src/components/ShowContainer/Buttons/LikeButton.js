import React, { Component } from 'react';
import { action } from 'mobx';

import { ActionButton } from '../../_global/Buttons/ActionButton';

export class LikeButton extends Component {

  @action.bound
  handleClick(evt) {
    evt.preventDefault();

    const { isLoading, isDisabled } = this.props;

    if (isDisabled || isLoading) {
      return null;
    }

    const { onClick } = this.props;

    return onClick('like');
  }

  render() {
    const { likesCount } = this.props;
    const { isDisabled, isLoading } = this.props;

    const showText = likesCount >= 0;

    return (
      <ActionButton
        disabled={isDisabled}
        likesCount={likesCount}
        loading={isLoading}
        onClick={this.handleClick}
        showText={showText}
      />
    );
  }

}
