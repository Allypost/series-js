import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { cx, css } from 'emotion';
import lodash from 'lodash';

const container = css`
  display: inline-block;
  line-height: 1.2em;
`;

const label = css`
  cursor: pointer;
  line-height: 1;
  vertical-align: middle;
  padding: 0 1em;
`;

const icon = css`
  line-height: 1;
  vertical-align: middle;
  color: #ff758c;
`;

const input = css`
  display: none;
`;

export class Checkbox extends Component {

  id = lodash.uniqueId('id_');

  render() {
    const { id: inputId } = this;
    const { className, children } = this.props;
    const { defaultChecked, onChange } = this.props;

    return (
      <div className={cx(container, className)}>
        <input
          className={input}
          defaultChecked={defaultChecked}
          id={inputId}
          onChange={onChange}
          type="checkbox"
        />
        <i className={cx('material-icons', icon)}>
          {defaultChecked ? 'check_box' : 'check_box_outline_blank'}
        </i>
        <label
          className={label}
          htmlFor={inputId}
        >
          {children}
        </label>
      </div>
    );
  }

}

Checkbox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]),
  className: PropTypes.string,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  children: null,
  className: '',
  defaultChecked: false,
  onChange: () => { },
};
