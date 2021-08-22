import React from 'react';
import PropTypes from 'prop-types';
import './InputFiltered.scss';

export const InputFiltered = ({
  value,
  onChange,
  placeholder,
  classes,
}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`input ${classes}`}
  />
);

InputFiltered.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.string.isRequired,
};
