import React, { useEffect, useState } from 'react';
import { getLocations } from '../../api/api';
import { Button } from '../Button/Button';

export const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  console.log(locations)
  let pageOfEpisodes = `?page=${page}`;

  useEffect(() => {
    getLocations()
      .then(response => response.results)
      .then(setLocations);
  }, []);

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
          {locations.map(episode => (
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
