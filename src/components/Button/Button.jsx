import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ text, classes, onClick, disabled }) => {
  const click = () => onClick();

  return (
    <button
      type="button"
      style={{
        'min-width': '100px',
      }}
      className={classes}
      disabled={disabled}
      onClick={click}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  onClick: true,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
