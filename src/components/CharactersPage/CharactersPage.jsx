import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { BASE_URL } from '../../api/api';
import { Characters } from './Characters';

import './CharactersPage.scss';
import { Button } from '../Button/Button';
import { SelectFilter } from '../SelectFilter';

export const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filterGender, setFilterGender] = useState('all');
  const [filterSpecies, setFilterSpecies] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const charactersList = `${BASE_URL}/character/?page=${currentPage}`;

  useEffect(() => {
    axios.get(charactersList)
      .then((response) => {
        setIsLoading(true);
        const listOfCharacters = (response.data);

        setCharacters(listOfCharacters.results);
        setInfo(listOfCharacters.info);
        setIsLoading(false);
      });
  }, [charactersList]);

  const filterCharacters = useMemo(() => {
    let result = characters;

    switch (filterGender) {
      case 'all':
        result = result.filter(character => character.gender !== undefined);
        break;
      case 'male':
        result = result.filter(character => character.gender === 'Male');
        break;
      case 'female':
        result = result.filter(character => character.gender === 'Female');
        break;
      case 'unknown':
        result = result.filter(character => character.gender === 'unknown');
        break;
      default:
        break;
    }

    switch (filterSpecies) {
      case 'all':
        result = result.filter(character => character.species !== undefined);
        break;
      case 'human':
        result = result.filter(character => character.species === 'Human');
        break;
      case 'alien':
        result = result.filter(character => character.species === 'Alien');
        break;
      default:
        break;
    }

    switch (filterStatus) {
      case 'all':
        result = result.filter(character => character.status !== undefined);
        break;
      case 'dead':
        result = result.filter(character => character.status === 'Dead');
        break;
      case 'alive':
        result = result.filter(character => character.status === 'Alive');
        break;
      case 'unknown':
        result = result.filter(character => character.status === 'unknown');
        break;
      default:
        break;
    }

    return result;
  }, [characters, filterGender, filterSpecies, filterStatus]);

  const nextPage = () => {
    if (currentPage > info.pages) {
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage < 1) {
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  const genderValues = ['all', 'male', 'female', 'unknown'];
  const statusValues = ['all', 'dead', 'alive', 'unknown'];
  const speciesValues = ['all', 'human', 'alien'];

  return (
    <div className="characters">
      <form className="characters__form box mt-4">
        <Button
          disabled={info.pages === null}
          onClick={() => prevPage()}
          classes="button is-primary"
          text="Previous"
        />
        <SelectFilter
          values={genderValues}
          classes="is-primary"
          name="all"
          handleChange={event => setFilterGender(event.target.value)}
        />
        <SelectFilter
          values={statusValues}
          classes="is-primary"
          name="all"
          handleChange={event => setFilterStatus(event.target.value)}
        />
        <SelectFilter
          values={speciesValues}
          classes="is-primary"
          name="all"
          handleChange={event => setFilterSpecies(event.target.value)}
        />
        <Button
          disabled={info.pages === currentPage}
          onClick={() => nextPage()}
          classes="button is-primary"
          text="Next"
        />
      </form>
      <Characters characters={filterCharacters} isLoading={isLoading} />
    </div>
  );
};
