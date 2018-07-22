import React, { Component } from 'react';
import { css } from 'emotion';

export const containerStyle = css`
  & {
    display: inline-block;
    font-size: .9em;
    height: 2em;
    line-height: 2.2em;
    cursor: pointer;
    padding: .5em;
    border: 1px solid #e0e0e0;
    border-radius: 50em;
    text-align: center;
    color: #424242;
  
    * {
      user-select: none;
    }
  }
`;

export const containerActions = css`
  & {
    transition: border .25s ease-in, background .3s ease-in;
  }

  &:hover {
    border-color: #9e9e9e;
    background-color: #fafafa;
    transition: border .1s ease-out, background .1s ease-out;
  }

  &:active {
    border-color: #616161;
    background-color: #eeeeee;
  }
`;

export const iconStyle = css`
  font-size: 1.5em;
  line-height: 1em;
  background-color: #ff758c;
  color: #fff;
  padding: 0 .314em;
  border-radius: 100%;
  font-family: monospace;
  vertical-align: text-bottom;
`;

export const textStyle = css`
  padding-left: .5em;
  padding-right: .3em;
  line-height: 1.46em;
  font-size: 1.4em;
  float: right;
`;

export class SeriesActionButton extends Component {

  render() {
    const { icon, text } = this.props;

    return (
      <div className={containerStyle}>
        <span className={iconStyle}>
          {icon}
        </span>
        <span className={textStyle}>
          {text}
        </span>
      </div>
    );
  }

}
