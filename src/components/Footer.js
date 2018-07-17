import React, { Component } from 'react';
import { css } from 'emotion';

const container = css`
  display: grid;
  list-style: none;
  grid-column-start: 2;
  grid-column-end: -2;
  grid-row: 12;
  padding-top: 1.69em;
`;

const logoImage = css`
  width: 100px;
  height: auto;
`;

const navigation = css`
  justify-self: start;
`;

const listItem = css`
  display: inline;
  padding: .5em;
`;

const social = css`
  justify-self: end;
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
          <ul>
            <li className={listItem}>
              About Us
            </li>
            <li className={listItem}>
              Privacy Policy
            </li>
            <li className={listItem}>
              Terms of Service
            </li>
          </ul>
          &#169;
          {(new Date()).getFullYear()}
          &nbsp;Shows. All rights reserved. Additional terms and conditions may apply.
        </div>
        <div className={social}>
          <ul>
            <li className={listItem}>
              <img
                alt="facebook"
                className={socialImage}
                src="/img/ic-facebook@3x.png"
              />
            </li>
            <li className={listItem}>
              <img
                alt="twitter"
                className={socialImage}
                src="/img/ic-twitter@3x.png"
              />
            </li>
            <li className={listItem}>
              <img
                alt="linkedin"
                className={socialImage}
                src="/img/ic-linkedin@3x.png"
              />
            </li>
          </ul>
        </div>
      </footer>
    );
  }

}
