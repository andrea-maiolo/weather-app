# WeatherWise

This weather application is a web-based tool that provides real-time weather information for locations around the world. It's designed to help users check the current weather conditions, forecasts, and other related information.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Demo

This site is live at https://andrea-maiolo.github.io/weather-app/

## Features

- **Location-Based Weather:** Get weather updates for any location worldwide.
- **Current Conditions:** View current weather conditions, including temperature, humidity, wind speed, and description.
- **Forecast:** Access detailed weather forecasts for the next few days.
- **Search Functionality:** Search for weather information for specific cities or regions.
- **Responsive Design:** The application is optimized for various devices, including desktops, tablets, and smartphones.

## Technologies Used

- **Front-end:** HTML, CSS, JavaScript, React.js
- **Weather API:** Integrate with a weather data API (OpenWeatherMap) to fetch weather information.
- **Deployment:** GitHub Pages.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd weather-application
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up API keys:
   - Obtain API keys from the weather data provider and.
   - Create a `.env` file in the root directory.
   - Add the API keys to the `.env` file:
     ```
     REACT_APP_WEATHER_API_KEY=your_weather_api_key
     REACT_APP_GEOCODING_API_KEY=your_geocoding_api_key
     ```

4. Start the development server:
   ```
   npm start
   ```

## Usage

- Enter the name of a city or region in the search bar.
- Press enter or click the search button to view the weather information for the specified location.
- Explore current conditions and the forecast for the upcoming days.
- The application updates the weather information dynamically as users enter different locations.

## License

This project is licensed under the MIT License.
