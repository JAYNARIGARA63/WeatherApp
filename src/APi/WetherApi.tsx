import axios from 'axios';

const API_KEY = '9b429ae6abbe7359f153c17b3c21ab21';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const WetherApi = async (latitude: number, logitude: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?lat=${latitude}&lon=${logitude}&appid=${API_KEY}&units=metric`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
