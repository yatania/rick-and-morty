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
  const [filterGender, setFilterGender] = useState('gender');
  const [filterSpecies, setFilterSpecies] = useState('species');
  const [filterStatus, setFilterStatus] = useState('status');

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

        return result;
      case 'male':
        result = result.filter(character => character.gender === 'Male');

        return result;
      case 'female':
        result = result.filter(character => character.gender === 'Female');

        return result;
      case 'unknown':
        result = result.filter(character => character.gender === 'unknown');

        return result;
      default:
        break;
    }

    switch (filterSpecies) {
      case 'all':
        result = result.filter(character => character.species !== undefined);

        return result;
      case 'human':
        result = result.filter(character => character.species === 'Human');

        return result;
      case 'alien':
        result = result.filter(character => character.species === 'Alien');

        return result;
      default:
        break;
    }

    switch (filterStatus) {
      case 'all':
        result = result.filter(character => character.status !== undefined);

        return result;
      case 'dead':
        result = result.filter(character => character.status === 'Dead');

        return result;
      case 'alive':
        result = result.filter(character => character.status === 'Alive');

        return result;
      case 'unknown':
        result = result.filter(character => character.status === 'unknown');

        return result;
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
          name="gender"
          handleChange={event => setFilterGender(event.target.value)}
        />
        <SelectFilter
          values={statusValues}
          classes="is-primary"
          name="status"
          handleChange={event => setFilterStatus(event.target.value)}
        />
        <SelectFilter
          values={speciesValues}
          classes="is-primary"
          name="species"
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
