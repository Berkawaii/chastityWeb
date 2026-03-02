import axios from 'axios';

const API_KEY = import.meta.env.VITE_EUROPEANA_API_KEY;
const BASE_URL = 'https://api.europeana.eu/record/v2';

const europeanaApi = axios.create({
  baseURL: BASE_URL,
});

// Middleware to inject API key to every request
europeanaApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    wskey: API_KEY,
  };
  return config;
});

export const searchArtworks = async ({
  query = '*',
  rows = 24,
  start = 1,
  reusability = 'open',
  type = 'IMAGE',
  theme = null,
}) => {
  try {
    const params = {
      query,
      rows,
      start,
      profile: 'standard',
      media: true,
      reusability,
    };

    if (type) params.type = type;
    if (theme) params.qf = `THEME:${theme}`;

    const response = await europeanaApi.get('/search.json', { params });

    return {
      items: response.data.items || [],
      totalResults: response.data.totalResults || 0,
    };
  } catch (error) {
    console.error('Error searching artworks:', error);
    throw error;
  }
};

export const getArtworkDetail = async (id) => {
  try {
    // some IDs contain dataset parts, ensure format is {datasetId}/{localId}
    const response = await europeanaApi.get(`/${id}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching artwork detail:', error);
    throw error;
  }
};

export const getFeaturedArtworks = async () => {
  // Fetching a random interesting set of masterpieces
  return searchArtworks({
    query: 'masterpiece',
    rows: 10,
    reusability: 'open',
  });
};

export default europeanaApi;
