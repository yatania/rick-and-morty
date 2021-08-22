import React from 'react';
import picture from '../../images/image.jpg';
import './EmptyList.scss';

export const EmptyList = () => (
  <div className="EmptyList">
    <img
      className="EmptyList__image"
      src={picture}
      alt="Two characters"
    />
    <p className="EmptyList__text">
      Nothing to watch
    </p>
  </div>
);
