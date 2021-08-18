const BASE_URL = 'https://rickandmortyapi.com/api';

export const request = (url) => {
  const newError = new Error('Server does not respond!');

  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(newError);
    });
};

export const getCharacters = async(endpoint) => {
  const charactersList = await request(`/character${endpoint || ''}`);

  return charactersList;
};

export const getEpisodes = async(endpoint) => {
  const episodesList = await request(`/episode${endpoint}`);

  return episodesList;
};

export const getLocations = async(endpoint) => {
  const locationsList = await request(`/episode${endpoint}`);

  return locationsList;
};
