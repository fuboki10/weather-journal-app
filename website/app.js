/* Global Variables */
const openWeatherApiKey = '8459af060455c7b36006073e9bb5d83a';
const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${openWeatherApiKey}`;
const backendUrl = 'http://127.0.0.1:3000';

// Create a new date instance dynamically with JS
/**
 * Get Current Date
 * 
 * @returns date
 */
const getDate = () => {
  const d = new Date();
  return d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
}

/**
 * update UI
 */
const updateUI = (data) => {
  if (!data || !data.date || !data.temperature || !data.userResponse) {
    return;
  }

  document.getElementById('date').innerText = data.date;
  document.getElementById('temp').innerText = data.temperature;
  document.getElementById('content').innerText = data.userResponse;
}

/**
 * Get zip code
 * 
 * @returns zip code string
 */
const getZipCode = () => {
  return document.getElementById('zip').value;
}

/**
 * Get Weather Data
 * 
 * @returns weather data
 */
const getWeatherData = async () => {
  const zipCode = getZipCode();
  const url = `${openWeatherUrl}&zip=${zipCode}`;
  try {
    // fetch data from the server
    const req = await fetch(url);
    // convert data to json
    const data = await req.json();

    return data;

  } catch (error) {
    console.error('error', error);
  }
}

/**
 * Get User Response
 * @returns userResponse
 */
const getUserResponse = () => {
  return document.getElementById('feelings').value;
}

const postData = async (data) => {
  const url = `${backendUrl}/weather`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('error', error);
  }
}

const sendDataToServer = (weather) => {
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
  try {
    const req = await fetch(url);

    const data = await req.json();
    return data;
  } catch (error) {
    console.error('error', error);
  }
}


window.addEventListener('DOMContentLoaded', (e) => {
  // update UI
  getDataFromServer()
    .then(updateUI);

  const formButton = document.getElementById('generate');

  formButton.addEventListener('click', (e) => {
    getWeatherData()
      .then(sendDataToServer)
      .then(updateUI);
  });
});