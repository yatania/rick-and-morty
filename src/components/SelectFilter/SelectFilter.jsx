import React from 'react';
import PropTypes from 'prop-types';

export const SelectFilter = ({
  values,
  classes,
  handleChange,
  name,
}) => (
  <div className={`select ${classes}`}>
    <select onChange={handleChange} name={name}>
      {values.map(value => (
        <option
          key={value}
          value={value}
          className="has-text-centered"
        >
          {value.toUpperCase()}
        </option>
      ))}
    </select>
  </div>
);

SelectFilter.defaultProps = {
  classes: '',
};

SelectFilter.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
