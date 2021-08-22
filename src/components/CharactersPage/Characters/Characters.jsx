import React from 'react';
import PropTypes from 'prop-types';

import { Loader } from '../../Loader/Loader';

import 'bulma';
import './Characters.scss';
import { Character } from '../Character/Character';

export const Characters = ({ characters, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="cards">
      {characters.map(character => (
        <Character character={character} />
      ))}
    </div>
  );
};

Characters.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      species: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      location: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
