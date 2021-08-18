import React, { useEffect, useState } from 'react';
import { Characters } from './Characters';
import { Pagination } from '../Pagination/Pagination';
import { getCharacters } from '../../api/api';
import './Characters/Characters.scss';

export const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPages, setAllPages] = useState(1);

  useEffect(() => {
    const serverResponse = async() => {
      setIsLoading(true);

      const listOfCharacters = await getCharacters(`/?page=${currentPage}`);

      const pagesCount = await getCharacters();

      setCharacters(listOfCharacters.results);
      setAllPages(pagesCount.info.pages);
      setIsLoading(false);
    };

    serverResponse();
  }, [setCurrentPage, currentPage]);

  const nextPage = () => {
    setCurrentPage((currentPage + 1) || allPages);
  };

  const prevPage = () => {
    setCurrentPage((currentPage - 1) || 1);
  };

  return (
    <div className="characters pt-5">
      <Pagination
        page={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      <Characters characters={characters} isLoading={isLoading} />
    </div>
  );
};
