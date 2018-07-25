import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import { css } from 'emotion';

import { containerStyle as defaultContainerStyle, containerActions as defaultContainerActions, iconStyle as defaultIconStyle, textStyle } from '../../_global/Buttons/ActionButtonStyles';
import { ActionButton } from '../../_global/Buttons/ActionButton';


const containerStyle = css`
  ${defaultContainerStyle}
  ${defaultContainerActions}
`;

const iconStyle = css`
  ${defaultIconStyle}
  padding: 0 .385em .175em;
  vertical-align: baseline;
`;

@inject('state')
@observer
export class AddEpisodeButton extends Component {

  @action.bound
  handleClick(evt) {
    evt.preventDefault();

    const { state } = this.props;
    const { modalStates } = state;

    modalStates.addEpisode = !modalStates.addEpisode;
  }

  render() {
    const classes = {
      container: containerStyle,
      icon: iconStyle,
      text: textStyle,
    };

    const { onClick = this.handleClick } = this.props;

    return (
      <ActionButton
        classes={classes}
        icon="✚"
        likesCount="Add Episode"
        onClick={onClick}
      />
    );
  }

}
