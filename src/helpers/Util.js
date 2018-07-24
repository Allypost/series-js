import React from 'react';

export default class Util {
  static camelCase(str) {
    return (
      str
        .replace(/\s(.)/g, (match) => match.toUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, (match) => match.toLowerCase())
    );
  }

  static flattenArray(array) {
    const flatten =
      (arr) =>
        arr.reduce(
          (acc, val) => {
            const value =
              Array.isArray(val) ?
                flatten(val) :
                val;

            return acc.concat(value);
          },
          []
        );
    return flatten(array);
  }

  static spinnerComponent(size = 'big', colour = 'blue') {
    /* eslint-disable react/jsx-max-depth */
    return (
      <div className={`preloader-wrapper ${size} active`}>
        <div className={`spinner-layer spinner-${colour}-only`}>
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    );
    /* eslint-enable react/jsx-max-depth */
  }

  static getUserToken() {
    const { token = '' } = Util.getUserData();

    return token;
  }

  static getUserData() {
    const tokenLocation = localStorage.getItem('token_location');
    const store = window[tokenLocation];

    if (!store) {
      return {};
    }

    const token = store.getItem('token') || '';
    const username = store.getItem('username') || '';
    const { _id: id } = Util.parseJWT(token) || {};

    return {
      id,
      token,
      username,
    };
  }

  static parseJWT(token) {
    if (!token) {
      return null;
    }

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
  }

}
