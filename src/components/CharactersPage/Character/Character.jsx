import React, { useState } from 'react';

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
    location
  } = character;

  return (
    // <div className="modalCard">
    //   <img src={image} alt="Character" />
    //   <h2 className="modalCard__title">
    //     {name}
    //   </h2>

    // </div>
  );
};
