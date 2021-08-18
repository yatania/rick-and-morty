import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ name, classes, cb, disabled }) => {
  const click = () => cb();

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={click}
    >
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
