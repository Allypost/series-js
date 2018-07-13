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
}
