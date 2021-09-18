/* Global Variables */
const openWeatherApiKey = '8459af060455c7b36006073e9bb5d83a';
const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${openWeatherApiKey}&units=metric`;
const backendUrl = 'http://127.0.0.1:3000';

// Create a new date instance dynamically with JS
/**
 * Get Current Date
 * 
 * @returns date
 */
const getDate = () => {
  const d = new Date();
  return (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
}

/**
 * update UI
 */
const updateUI = (data) => {
  if (!data || !data.date || !data.temperature || !data.userResponse) {
    return;
  }

  document.getElementById('date').innerHTML = data.date;
  document.getElementById('temp').innerHTML = `${data.temperature} c`;
  document.getElementById('content').innerHTML = data.userResponse;
}

/**
 * Get zip code
 * 
 * @returns zip code string
 */
const getZipCode = () => {
  const zipCode = document.getElementById('zip').value;

  if (!zipCode) {
    throw Error('Please Enter valid Zip Code Value');
  }

  return zipCode;
}

/**
 * Get Weather Data
 * 
 * @returns weather data
 */
const getWeatherData = async () => {
  const zipCode = getZipCode();
  const url = `${openWeatherUrl}&zip=${zipCode}`;
  // fetch data from the server
  const data = (await axios.get(url)).data;
  return data;
}

/**
 * Get User Response
 * @returns userResponse
 */
const getUserResponse = () => {
  const userResponse = document.getElementById('feelings').value;

  if (!userResponse) {
    throw Error('Please Enter valid feeling');
  }

  return userResponse;
}

const postData = async (data) => {
  const url = `${backendUrl}/weather`;
  try {
    await axios.post(url, data);
  } catch (error) {
    console.error('error', error);
  }
}

const sendDataToServer = (weather) => {
  if (!weather || !weather.main || !weather.main.temp) {
    throw Error('No Valid Weather for this Zip Code');
  }

  const data = {
    'temperature': weather.main.temp,
    'date': getDate(),
    'userResponse': getUserResponse()
  };

  postData(data);

  return data;
}

const getDataFromServer = async () => {
  const url = `${backendUrl}/weather`;
  const data = (await axios.get(url)).data;

  return data;
}

const handleError = (error) => {
  alert(error.message);
}


window.addEventListener('DOMContentLoaded', (e) => {
  // update UI
  getDataFromServer()
    .then(updateUI)
    .catch(handleError);

  const formButton = document.getElementById('generate');

  formButton.addEventListener('click', (e) => {
    getWeatherData()
      .then(sendDataToServer)
      .then(updateUI)
      .catch(handleError);
  });
});