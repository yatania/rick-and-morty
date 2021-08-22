/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import './WatchListPage.scss';
import { EmptyList } from '../EmptyList/EmptyList';
import { Button } from '../Button/Button';

const localStorageKey = 'watchList';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (value) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, save];
};

export const WatchListPage = () => {
  // eslint-disable-next-line max-len
  const [watchLaterList, setWatchLaterList] = useLocalStorage(localStorageKey, []);
  const [episodeName, setEpisodeName] = useState('');

  const addEpisode = (event) => {
    event.preventDefault();

    const newEpisode = {
      id: uuidv4(),
      name: episodeName,
      status: false,
    };

    const newList = [newEpisode, ...watchLaterList];

    setEpisodeName('');
    setWatchLaterList(newList);
  };

  const removeEpisode = (id) => {
    const updatedList = [...watchLaterList].filter(
      episode => episode.id !== id,
    );

    setWatchLaterList(updatedList);
  };

  const changeStatus = (id) => {
    const updatedList = watchLaterList.map(episode => (episode.id === id ? {
      ...episode,
      status: !episode.status,
    } : { ...episode }));

    setWatchLaterList(updatedList);
  };

  return (
    <div className="WatchList">
      <div className="WatchList__content">
        <form onSubmit={addEpisode}>
          <div className="field">
            <div className="control">
              <label className="label">
                Write the next episode to watch later :)
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Episode"
                  required
                  value={episodeName}
                  onChange={event => setEpisodeName(event.target.value)}
                />
              </label>
              <button type="submit" className="button is-primary">
                ADD NEW EPISODE
              </button>
            </div>
          </div>
        </form>
      </div>
      {watchLaterList.length < 1 ? (
        <EmptyList />
      ) : (
        <div className="WatchList__episodes box mt-4">
          <ul className="WatchList__list">
            {watchLaterList.map((episode) => {
              const itemClass = cn('WatchList__item', {
                'WatchList__item--checked': episode.status,
                'WatchList__item--unchecked': !episode.status,
              });

              return (
                <li key={episode.id} className={itemClass}>
                  <label>
                    <input
                      type="checkbox"
                      defaultChecked={episode.status}
                      className="WatchList__text"
                      onClick={() => changeStatus(episode.id)}
                    />
                    {episode.name}
                  </label>
                  <Button
                    text="Remove"
                    classes="button is-danger"
                    onClick={() => removeEpisode(episode.id)}
                  />
                </li>
              );
            })}
          </ul>
        </div>

      )}
    </div>
  );
};
