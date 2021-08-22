import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/api';

import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

import './EpisodePage.scss';

export const EpisodePage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(1);

  const episodesList = `${BASE_URL}/episode`;

  useEffect(() => {
    axios.get(episodesList)
      .then((response) => {
        setIsLoading(true);
        const listOfEpisodes = (response.data);

        setEpisodes(listOfEpisodes.results);
        setInfo(listOfEpisodes.info);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get(`${episodesList}?page=${page}`)
      .then((response) => {
        setIsLoading(true);
        const listOfEpisodes = (response.data);

        setEpisodes(listOfEpisodes.results);
        setIsLoading(false);
      });
  }, [page]);

  const titles = ['id', 'episode', 'name', 'air_date', 'characters'];
  const prevPage = () => {
    if (page < 1) {
      return;
    }

    setPage(page - 1);
  };

  const nextPage = () => {
    if (page > info.pages) {
      return;
    }

    setPage(page + 1);
  };

  return (
    <div className="Episodes">
      <div className="Episodes__wrapper">
        <div className="Episodes__buttons">
          <Button
            text="Previous"
            disabled={info.pages === null}
            classes="button is-primary"
            onClick={prevPage}
          />
          <Button
            text="Next"
            disabled={info.pages === page}
            classes="button is-primary"
            onClick={nextPage}
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <table className="table">
            <thead className="table__titles">
              <tr className="table__title">
                {titles.map(title => (
                  <th key={title}>
                    {title.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {episodes.map(episode => (
                <tr key={episode.id} className="table__row">
                  {titles.map(key => (
                    <td key={key} className="table__item">
                      {key !== 'characters'
                        ? episode[key]
                        : episode[key].length
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
