import { useState, useEffect } from 'react';
import { WeatherData } from '@/types';

// Fethiye, Turkey coordinates
const LATITUDE = 36.62167;
const LONGITUDE = 29.11639;

const getWeatherIcon = (weatherCode: number): string => {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  const iconMap: { [key: number]: string } = {
    0: '☀️', // Clear sky
    1: '🌤️', // Mainly clear
    2: '⛅', // Partly cloudy
    3: '☁️', // Overcast
    45: '🌫️', // Foggy
    48: '🌫️', // Depositing rime fog
    51: '🌧️', // Light drizzle
    53: '🌧️', // Moderate drizzle
    55: '🌧️', // Dense drizzle
    61: '🌧️', // Slight rain
    63: '🌧️', // Moderate rain
    65: '🌧️', // Heavy rain
    71: '🌨️', // Slight snow
    73: '🌨️', // Moderate snow
    75: '🌨️', // Heavy snow
    77: '🌨️', // Snow grains
    80: '🌧️', // Slight rain showers
    81: '🌧️', // Moderate rain showers
    82: '🌧️', // Violent rain showers
    85: '🌨️', // Slight snow showers
    86: '🌨️', // Heavy snow showers
    95: '⛈️', // Thunderstorm
    96: '⛈️', // Thunderstorm with slight hail
    99: '⛈️', // Thunderstorm with heavy hail
  };
  return iconMap[weatherCode] || '☀️';
};

const getWeatherCondition = (weatherCode: number): string => {
  if (weatherCode === 0) return 'Clear';
  if (weatherCode <= 2) return 'Partly Cloudy';
  if (weatherCode === 3) return 'Overcast';
  if (weatherCode <= 48) return 'Foggy';
  if (weatherCode <= 55) return 'Drizzle';
  if (weatherCode <= 65) return 'Rain';
  if (weatherCode <= 77) return 'Snow';
  if (weatherCode <= 82) return 'Rain Showers';
  if (weatherCode <= 86) return 'Snow Showers';
  return 'Thunderstorm';
};

const getWeatherDescription = (weatherCode: number): string => {
  const descriptions: { [key: number]: string } = {
    0: 'clear sky',
    1: 'mainly clear',
    2: 'partly cloudy',
    3: 'overcast',
    45: 'foggy',
    48: 'depositing rime fog',
    51: 'light drizzle',
    53: 'moderate drizzle',
    55: 'dense drizzle',
    61: 'slight rain',
    63: 'moderate rain',
    65: 'heavy rain',
    71: 'slight snow fall',
    73: 'moderate snow fall',
    75: 'heavy snow fall',
    77: 'snow grains',
    80: 'slight rain showers',
    81: 'moderate rain showers',
    82: 'violent rain showers',
    85: 'slight snow showers',
    86: 'heavy snow showers',
    95: 'thunderstorm',
    96: 'thunderstorm with slight hail',
    99: 'thunderstorm with heavy hail',
  };
  return descriptions[weatherCode] || 'clear sky';
};

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Check if we're offline
        if (!navigator.onLine) {
          throw new Error('No internet connection');
        }

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        );

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        const weatherCode = data.current.weather_code;
        
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: getWeatherCondition(weatherCode),
          description: getWeatherDescription(weatherCode),
          icon: getWeatherIcon(weatherCode),
          humidity: Math.round(data.current.relative_humidity_2m),
          windSpeed: Math.round(data.current.wind_speed_10m),
        });
        setError(null);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to fetch weather');
        setError(error);
        
        // Fallback weather data
        setWeather({
          temp: 25,
          condition: 'Sunny',
          description: 'Clear sky',
          icon: '☀️',
          humidity: 65,
          windSpeed: 5,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Set up interval for periodic updates
    const interval = setInterval(() => {
      // Only fetch if we're online
      if (navigator.onLine) {
        fetchWeather();
      }
    }, 5 * 60 * 1000);

    // Listen for online/offline events
    const handleOnline = () => fetchWeather();
    window.addEventListener('online', handleOnline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return { weather, loading, error };
}