import React, { useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import { BASE_URL } from '../../api/api';

import { Button } from '../Button/Button';
import { EmptyList } from '../EmptyList/EmptyList';
import { InputFiltered } from '../InputFiltered/InputFiltered';
import { Loader } from '../Loader/Loader';

import './LocationsPage.scss';

export const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [page, setPage] = useState(1);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [dimension, setDimension] = useState('');

  const locationsList = `${BASE_URL}/location`;

  useEffect(() => {
    axios.get(locationsList)
      .then((response) => {
        setInfo(response.data.info);
      });
  }, []);

  useEffect(() => {
    axios.get(`${locationsList}?page=${page}`)
      .then((response) => {
        setIsLoading(true);
        const listOfLocations = (response.data);

        setLocations(listOfLocations.results);
        setFilteredLocations(listOfLocations.results);
        setIsLoading(false);
      });
  }, [page]);

  useMemo(() => {
    let locationFilterList = locations;

    if (name) {
      locationFilterList = locationFilterList.filter(
        location => location.name.toLowerCase()
          .startsWith(name.toLowerCase()),
      );
    }

    if (type) {
      locationFilterList = locationFilterList.filter(
        location => location.type.toLowerCase()
          .startsWith(type.toLowerCase()),
      );
    }

    if (dimension) {
      locationFilterList = locationFilterList.filter(
        location => location.dimension.toLowerCase()
          .startsWith(dimension.toLowerCase()),
      );
    }

    if (name.length === 0
        || type.length === 0
        || dimension.length === 0
    ) {
      setFilteredLocations(locationFilterList);
    } else {
      setFilteredLocations(locations);
    }
  }, [name, type, dimension, locations]);

  const titles = ['id', 'name', 'type', 'dimension', 'residents'];

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
    <div className="locations">
      <form className="locations__form mt-4">
        <span className="locations__text">
          Search by:
        </span>
        <InputFiltered
          value={name}
          placeholder="Name"
          onChange={event => setName(event.target.value)}
        />
        <InputFiltered
          value={type}
          placeholder="Type"
          onChange={event => setType(event.target.value)}
        />
        <InputFiltered
          value={dimension}
          placeholder="Dimension"
          onChange={event => setDimension(event.target.value)}
        />
      </form>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {filteredLocations.length > 1 ? (
            <table className="table mt-4">
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
                {filteredLocations.map(episode => (
                  <tr key={episode.id} className="table__row">
                    {titles.map(key => (
                      <td key={key} className="table__item">
                        {key !== 'residents'
                          ? episode[key]
                          : episode[key].length
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyList />
          )}
        </>
      )}
      <div className="locations__buttons">
        <Button
          text="Previous"
          disabled={info.pages === null}
          classes="button is-primary locations__buttons--prev"
          onClick={prevPage}
        />
        <Button
          text="Next"
          disabled={info.pages === page}
          classes="button is-primary locations__buttons--next"
          onClick={nextPage}
        />
      </div>
    </div>
  );
};
