# Weather library for the Vente-Privee project

#### Minimal library for weather forecasts

## Installation:

This is a Node.js module and can be found on the [NPM registry](<https://www.npmjs.com/package/@andrearizzello/weather_lib>).

Installation is done using the [`npm install` command](<https://docs.npmjs.com/downloading-and-installing-packages-locally>):

```zsh
$ npm i @andrearizzello/weather_lib
```

## Features:

- Easy to use library
- Get weather forecast information based on:
  1. City ID (check [HERE](https://gist.github.com/andrearizzello/7c958e67855b18c62c736fd3d28cf0b0) for the list)
  2. City Name
  3. Coordinates
- Possibility to get more specific/advanced information
- Possibility of obtaining up to **5 days** of forecasts

## Quick Start:

```javascript
const Weather = require('@andrearizzello/weather_lib');

let weathObj = new Weather('YOUR_API_KEY');

weathObj.getCurrentWeatherByName('Paris', 'FR', false, 1)
	.then(result => console.log("CURR BY NAME\n", result), reason => console.log(reason));
```

#### Expected output (test case)

![Output](<https://gist.githubusercontent.com/andrearizzello/fcc007636c228200bffe084c26219cca/raw/b9b6470f61b71a264c6ec31f0d12ea977f63b00e/example.png>)

## In-depth documentation:

At the moment the library has 2 main functions:

- One to get the current weather
- One to get the forecast for the next 5 days

These functions are used as follows:

```javascript
// ############################ CURRENT WEATHER ###################################

weathObj.getCurrentWeatherByID(2968815, true, 0)
    .then(result => console.log("CURR BY ID\n", result), reason => console.log(reason));

weathObj.getCurrentWeatherByName("Paris", "FR", true, 0)
    .then(result => console.log("CURR BY NAME\n", result), reason => console.log(reason));

weathObj.getCurrentWeatherByCoords(48.8566, 2.3515, true, 0)
    .then(result => console.log("CURR BY COORDS\n", result), reason => console.log(reason));

// ############################ FORECAST WEATHER #################################

weathObj.getForecastByID(2968815, new Date('02/03/2019 9:00'), true, 0)
    .then(result => console.log("FORECAST BY ID\n", result), reason => console.log(reason));

weathObj.getForecastByName("Paris", 'FR', new Date('02/03/2019 9:00'), true, 0)
    .then(result => console.log("FORECAST BY NAME\n", result), reason => console.log(reason));

weathObj.getForecastByCoords(48.8566, 2.3515, new Date("02/03/2019 9:00"), true, 0)
    .then(result => console.log("FORECAST BY COORDS\n", result), reason => console.log(reason));
```

- ***getCurrentWeatherByID*** accepts at least **1** argument, the ID of the city you want to get the weather, the other 2 arguments are used if you want to get additional data.

- ***getCurrentWeatherByName*** accepts at least **2** arguments, the name of the city and the country, the other 2 arguments are again used if you want to get additional data.

- ***getCurrentWeatherByCoords*** accepts at least **2** arguments, latitude and longitude respectively, the other 2 arguments are used to get additional data.

- ***getForecastByID*** accepts at least **2** arguments, the ID of the city,  the date and time (the latter if necessary) at which you wish to obtain the forecasts, the last two arguments, as before, are used to get additional data.

- ***getForecastByName*** accepts at least **3** arguments, the name of the city, the country, the date and time (the latter if necessary) at which you wish to obtain the forecast, the last two arguments, are used to get additional data.

- ***getForecastByCoords*** accepts at least **3** arguments, latitude and longitude respectively and also date and time (the latter if necessary) at which you wish to obtain the forecast, the last two arguments, as before, are used to get additional data.

A better explainded documentation of each function can be also found inside the code files.

## Tests:

Tests are included in the library, you can find them in the `tests` folder, if you want to run them just use:

```shell
npm test
```

**Keep in mind that you need to set the env variable `process.env.APIKEY` with your key if you want to run the tests**

Here is an example:

![](<https://gist.githubusercontent.com/andrearizzello/4c91af681beceb9e58138ec8616d0a71/raw/7ca104a96badc3e28b04ebb7d44426e68f595b4f/example_tests.png>)

