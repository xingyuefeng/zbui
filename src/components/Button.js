import React, { Component } from 'react';
import classNames from 'classnames';

export default class Button extends Component {
  render() {
    const { type, children, className, size } = this.props;
    const btnClass = classNames(
      'x-button',
      className,
      type && `x-button-${type}`,
      size && `x-button-${size}`,
    );
    return (
      <button className={btnClass}>
        {children}
      </button>
    );
  }
}
