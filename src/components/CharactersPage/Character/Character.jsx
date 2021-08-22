import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Character.scss';
import '../Characters/Characters.scss';
import cn from 'classnames';

export const Character = ({ character }) => {
  const [additionalInfo, setAdditionalInfo] = useState(false);

  const {
    id,
    name,
    image,
    gender,
    species,
    status,
    type,
    location,
  } = character;

  function showInfo() {
    return setAdditionalInfo(true);
  }

  function hideInfo() {
    return setAdditionalInfo(false);
  }

  return (
    <>
      <div
        className="card cards__card"
        key={id}
        onClick={() => showInfo()}
        aria-hidden="true"
      >
        <div className="card-image">
          <img
            src={image}
            alt="Character"
            className="cards__image"
          />
        </div>
        <h4 className="title is-4 is-uppercase p-4 cards__title">
          {name}
        </h4>
      </div>
      {additionalInfo && (
        <div
          className={cn({
            modal: true,
            'modal--active': additionalInfo,
          })}
          aria-hidden="true"
          onClick={() => hideInfo()}
        >
          <div
            className="modal__content"
            onClick={e => e.stopPropagation()}
            aria-hidden="true"
          >
            <img
              src={image}
              alt="Character"
              className="modal__image"
            />
            <div className="modal__text mb-4">
              <p>
                {`Gender: `}
                <span className="modal__info has-text-primary">
                  {gender}
                </span>
              </p>
              <p>
                {`Species: `}
                <span className="modal__info has-text-primary">
                  {species}
                </span>
              </p>
              <p>
                {`Status: `}
                <span className="modal__info has-text-primary">
                  {status}
                </span>
              </p>
              {type && (
                <p>
                  {`Type: `}
                  <span className="modal__info has-text-primary">
                    {type}
                  </span>
                </p>
              )}

              <p>
                {`Location: `}
                <span className="modal__info has-text-primary">
                  {location.name}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => hideInfo()}
              className="button is-danger modal__button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Character.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    type: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
