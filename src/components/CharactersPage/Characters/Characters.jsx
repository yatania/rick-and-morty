import React from 'react';
import PropTypes from 'prop-types';

import { Loader } from '../../Loader/Loader';

import 'bulma';
import './Characters.scss';

export const Characters = ({ characters, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="cards">
      {characters.map(character => (
        <div className="card cards__card" key={character.id}>
          <div className="card-image">
            <img
              src={character.image}
              alt="Character"
              className="cards__image"
            />
          </div>
          <h4 className="title is-4 is-uppercase py-4 mb-0 cards__title">
            {character.name}
          </h4>
          <div className="cards__info mb-4">
            <p>
              {`Gender: ${character.gender}`}
            </p>
            <p>
              {`Species: ${character.species}`}
            </p>
            <p>
              {`Status: ${character.status}`}
            </p>
          </div>
        </div>
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
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
