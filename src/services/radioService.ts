
// Service for fetching radio stations from the Radio Browser API
// Using the public API: https://de1.api.radio-browser.info/

/**
 * Radio station interface from the Radio Browser API
 */
export interface RadioStation {
  changeuuid: string;
  stationuuid: string;
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
  favicon: string;
  tags: string;
  country: string;
  countrycode: string;
  state: string;
  language: string;
  votes: number;
  codec: string;
  bitrate: number;
  hls: number;
  lastcheckok: number;
  lastchecktime: string;
  lastcheckoktime: string;
  lastlocalchecktime: string;
  clicktimestamp: string;
  clickcount: number;
  clicktrend: number;
}

/**
 * Simplified radio station interface for our application
 */
export interface Radio {
  id: string;
  name: string;
  genre: string;
  country: string;
  stream_url: string;
  favicon: string;
}

/**
 * Base URL for the Radio Browser API
 */
const BASE_URL = 'https://de1.api.radio-browser.info/json';

/**
 * Maps a RadioStation to our simplified Radio interface
 */
const mapToRadio = (station: RadioStation): Radio => {
  return {
    id: station.stationuuid,
    name: station.name,
    genre: station.tags || 'Unknown',
    country: station.country || 'Unknown',
    stream_url: station.url_resolved || station.url,
    favicon: station.favicon || '',
  };
};

/**
 * Fetches popular radio stations
 */
export const fetchPopularRadios = async (limit: number = 10): Promise<Radio[]> => {
  try {
    const response = await fetch(`${BASE_URL}/stations/topvote/${limit}`);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const stations: RadioStation[] = await response.json();
    return stations.map(mapToRadio);
  } catch (error) {
    console.error('Error fetching popular radios:', error);
    throw error;
  }
};

/**
 * Searches for radio stations
 */
export const searchRadios = async (term: string): Promise<Radio[]> => {
  try {
    const response = await fetch(`${BASE_URL}/stations/search?name=${encodeURIComponent(term)}&limit=100`);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const stations: RadioStation[] = await response.json();
    return stations.map(mapToRadio);
  } catch (error) {
    console.error('Error searching radios:', error);
    throw error;
  }
};

/**
 * Fetches all radio stations with optional filters
 */
export const fetchRadios = async (limit: number = 100): Promise<Radio[]> => {
  try {
    const response = await fetch(`${BASE_URL}/stations?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const stations: RadioStation[] = await response.json();
    return stations.map(mapToRadio);
  } catch (error) {
    console.error('Error fetching radios:', error);
    throw error;
  }
};

/**
 * Fetches radios by country
 */
export const fetchRadiosByCountry = async (country: string, limit: number = 100): Promise<Radio[]> => {
  try {
    const response = await fetch(`${BASE_URL}/stations/bycountry/${encodeURIComponent(country)}?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const stations: RadioStation[] = await response.json();
    return stations.map(mapToRadio);
  } catch (error) {
    console.error('Error fetching radios by country:', error);
    throw error;
  }
};

/**
 * Fetches radios by tag (genre)
 */
export const fetchRadiosByTag = async (tag: string, limit: number = 100): Promise<Radio[]> => {
  try {
    const response = await fetch(`${BASE_URL}/stations/bytag/${encodeURIComponent(tag)}?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const stations: RadioStation[] = await response.json();
    return stations.map(mapToRadio);
  } catch (error) {
    console.error('Error fetching radios by tag:', error);
    throw error;
  }
};
