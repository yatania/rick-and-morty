import React, { useEffect, useState } from 'react';
import { getEpisodes } from '../../api/api';
import { Button } from '../Button/Button';

export const EpisodePage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  console.log(episodes)
  let pageOfEpisodes = `?page=${page}`;

  useEffect(() => {
    getEpisodes(pageOfEpisodes)
      .then(response => response.results)
      .then(setEpisodes);
  }, [pageOfEpisodes]);

  const titles = ['id', 'name', 'air_date', 'episode', 'created'];
  const prevPage = () => setPage(page - 1);

  const nextPage = () => setPage(page + 1);

  return (
    <div className="episodes">
      <Button
        name="prev"
        classes="button"
        cb={prevPage}
      />
      <Button name="next" classes="button" cb={nextPage} />
      <table>
        <thead>
          <tr>
            {titles.map(title => (
              <th key={title}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {episodes.map(episode => (
            <tr key={episode.id}>
              {titles.map(key => (
                <td key={key}>
                  {episode[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
