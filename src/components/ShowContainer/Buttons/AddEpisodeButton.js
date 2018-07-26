import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
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

export class AddEpisodeButton extends Component {

  render() {
    const classes = {
      container: containerStyle,
      icon: iconStyle,
      text: textStyle,
    };

    const { onClick } = this.props;

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

AddEpisodeButton.propTypes = {
  onClick: PropTypes.func,
};

AddEpisodeButton.defaultProps = {
  onClick: () => { },
};
