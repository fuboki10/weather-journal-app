/* Global Variables */
const openWeatherApiKey = "8459af060455c7b36006073e9bb5d83a";
const openWeatherUrl = `http://maps.openweathermap.org/maps/2.0/weather?appid=${openWeatherApiKey}`;
const backendUrl = "http://127.0.0.1:3000/"

// Create a new date instance dynamically with JS
const getDate = () => {
  const d = new Date();
  return d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
}
