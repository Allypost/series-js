import React, { Component } from 'react';
import { css } from 'emotion';

const container = css`
  display: grid;
  list-style: none;
  grid-column-start: 2;
  grid-column-end: -2;
  grid-row: footer;
  padding: 1.69em 0;
`;

const logoImage = css`
  width: 100px;
  height: auto;
`;

const navigation = css`
  justify-self: start;
  grid-row: 2;
`;

const navigationLinkContainer = css`
  padding: 1em 0;
`;

const listItem = css`
  padding: .5em .8em;
`;

const social = css`
  display: grid;
  grid-auto-flow: column dense;
  align-items: center;
  justify-self: end;
  grid-row: 2;
`;

const socialImage = css`
  height: 2em;
`;

export class Footer extends Component {

  render() {
    return (
      <footer className={container}>
        <img
          alt="logo"
          className={logoImage}
          src="/img/img-logo-horizontal@3x.png"
        />

        <div className={navigation} >
          <div className={navigationLinkContainer}>
            <span className={listItem}>
              About Us
            </span>
            <span className={listItem}>
              Privacy Policy
            </span>
            <span className={listItem}>
              Terms of Service
            </span>
          </div>
          &#169;
          {(new Date()).getFullYear()}
          &nbsp;Shows. All rights reserved. Additional terms and conditions may apply.
        </div>
        <div className={social}>
          <span className={listItem}>
            <img
              alt="facebook"
              className={socialImage}
              src="/img/ic-facebook@3x.png"
            />
          </span>
          <span className={listItem}>
            <img
              alt="twitter"
              className={socialImage}
              src="/img/ic-twitter@3x.png"
            />
          </span>
          <span className={listItem}>
            <img
              alt="linkedin"
              className={socialImage}
              src="/img/ic-linkedin@3x.png"
            />
          </span>
        </div>
      </footer>
    );
  }

}
