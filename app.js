const fetch = require("node-fetch");
const d2d = require('degrees-to-direction');
const convertDate = require("./utils/DataManagement");
const units = ['metric', 'imperial'];

class Weather {

    /**
     *
     * @param APPKEY {String} (the key used by the API)
     */
    constructor(APPKEY) {
        this.APPKEY = APPKEY;
    }

    /**
     *
     * @param cityID {Number}: ID of the City
     * @param advanced {Boolean}: Include advanced stats
     * @param unit {Number}: Temperature unit (undefined = Kelvin, 0 = Celsius, 1 = Fahrenheit)
     * @returns {Promise}: Promise that contains data
     */
    async getCurrentWeatherByID(cityID, advanced = false, unit = undefined) {
        let url = `http://api.openweathermap.org/data/2.5/weather?id=${cityID}&APPID=${this.APPKEY}`;
        if (unit !== undefined && unit < 2) url = url.concat(`&units=${units[unit]}`);
        try {
            let response = await fetch(url);
            response = await response.json();
            if (response.cod && response.cod === "404") return Promise.reject(response);
            let returnData = {
                temperature: response.main.temp,
                pressure: response.main.pressure,
                humidity: response.main.humidity,
                temp_min: response.main.temp_min,
                temp_max: response.main.temp_max,
                wind: unit !== 1 ? response.wind.speed * 3.6 : response.wind.speed
            };
            if (advanced) {
                returnData.advancedStats = {
                    cityLongitude: response.coord.lon,
                    cityLatitude: response.coord.lat,
                    cityName: response.name,
                    windDirection: d2d(response.wind.deg),
                    windDirectionNumber: response.wind.deg,
                    cloudiness: response.clouds.all
                }
            }
            return returnData;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    /**
     *
     * @param cityName {String}: Name of the City
     * @param countryCode {String}: Country code in ISO 3166
     * @param advanced {Boolean}: Include advanced stats
     * @param unit {Number}: Temperature unit (undefined = Kelvin, 0 = Celsius, 1 = Fahrenheit)
     * @returns {Promise}: Promise that contains data
     */
    async getCurrentWeatherByName(cityName, countryCode, advanced = false, unit = undefined) {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&APPID=${this.APPKEY}`;
        if (unit !== undefined && unit < 2) url = url.concat(`&units=${units[unit]}`);
        try {
            let response = await fetch(url);
            response = await response.json();
            if (response.cod && response.cod === "404") return Promise.reject(response);
            let returnData = {
                temperature: response.main.temp,
                pressure: response.main.pressure,
                humidity: response.main.humidity,
                temp_min: response.main.temp_min,
                temp_max: response.main.temp_max,
                wind: unit !== 1 ? response.wind.speed * 3.6 : response.wind.speed
            };
            if (advanced) {
                returnData.advancedStats = {
                    cityLongitude: response.coord.lon,
                    cityLatitude: response.coord.lat,
                    cityName: response.name,
                    windDirection: d2d(response.wind.deg),
                    windDirectionNumber: response.wind.deg,
                    cloudiness: response.clouds.all
                }
            }
            return returnData;
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     *
     * @param lat {Number}: Latitude
     * @param lon {Number}: Longitude
     * @param advanced {Boolean}: Include advanced stats
     * @param unit {Number}: Temperature unit (undefined = Kelvin, 0 = Celsius, 1 = Fahrenheit)
     * @returns {Promise}: Promise that contains data
     */
    async getCurrentWeatherByCoords(lat, lon, advanced = false, unit = undefined) {
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${this.APPKEY}`;
        if (unit !== undefined && unit < 2) url = url.concat(`&units=${units[unit]}`);
        try {
            let response = await fetch(url);
            response = await response.json();
            if (response.cod && response.cod === "404") return Promise.reject(response);
            let returnData = {
                temperature: response.main.temp,
                pressure: response.main.pressure,
                humidity: response.main.humidity,
                temp_min: response.main.temp_min,
                temp_max: response.main.temp_max,
                wind: unit !== 1 ? response.wind.speed * 3.6 : response.wind.speed
            };
            if (advanced) {
                returnData.advancedStats = {
                    cityLongitude: response.coord.lon,
                    cityLatitude: response.coord.lat,
                    cityName: response.name,
                    windDirection: d2d(response.wind.deg),
                    windDirectionNumber: response.wind.deg,
                    cloudiness: response.clouds.all
                }
            }
            return returnData;
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     *
     * @param cityID {Number}: ID of the City
     * @param date {Date}: Date of the day you want to get the forecast
     * @param advanced {Boolean}: Include advanced stats
     * @param unit {Number}: Temperature unit (undefined = Kelvin, 0 = Celsius, 1 = Fahrenheit)
     * @returns {Promise}: Promise that contains data
     */
    async getForecastByID(cityID, date, advanced = false, unit = undefined) {
        let url = `http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&APPID=${this.APPKEY}`;
        if (unit !== undefined && unit < 2) url = url.concat(`&units=${units[unit]}`);
        try {
            let response = await fetch(url);
            response = await response.json();
            if (response.cod && response.cod === "404") return Promise.reject(response);
            let data_list = response.list;
            if ((date.getTime() / 1000) < data_list[0].dt ||
                (date.getTime() / 1000) > data_list[data_list.length - 1].dt) {
                return Promise.reject({
                    cod: '500',
                    message: 'Date must not exceed 5 days from now and it cannot be in the past'
                });
            }
            for (let i = 0; i < data_list.length; i++) {
                if (data_list[i].dt === (date.getTime() / 1000)) {
                    if (advanced) {
                        return {
                            temperature: data_list[i].main.temp,
                            pressure: data_list[i].main.pressure,
                            humidity: data_list[i].main.humidity,
                            temp_min: data_list[i].main.temp_min,
                            temp_max: data_list[i].main.temp_max,
                            wind: unit !== 1 ? data_list[i].wind.speed * 3.6 : data_list[i].wind.speed,
                            advancedStats: {
                                cityLongitude: response.city.coord.lon,
                                cityLatitude: response.city.coord.lat,
                                cityName: response.city.name,
                                windDirection: d2d(data_list[i].wind.deg),
                                windDirectionNumber: data_list[i].wind.deg,
                                cloudiness: data_list[i].clouds.all,
                                date_text: convertDate(new Date(data_list[i].dt_txt)).toString()
                            }
                        }
                    }
                    return {
                        temperature: data_list[i].main.temp,
                        pressure: data_list[i].main.pressure,
                        humidity: data_list[i].main.humidity,
                        temp_min: data_list[i].main.temp_min,
                        temp_max: data_list[i].main.temp_max,
                        wind: unit !== 1 ? data_list[i].wind.speed * 3.6 : data_list[i].wind.speed
                    }
                }
                if (data_list[i].dt > (date.getTime() / 1000)) {
                    if (advanced) {
                        return {
                            temperature: data_list[i - 1].main.temp,
                            pressure: data_list[i - 1].main.pressure,
                            humidity: data_list[i - 1].main.humidity,
                            temp_min: data_list[i - 1].main.temp_min,
                            temp_max: data_list[i - 1].main.temp_max,
                            wind: unit !== 1 ? data_list[i - 1].wind.speed * 3.6 : data_list[i - 1].wind.speed,
                            advancedStats: {
                                cityLongitude: response.city.coord.lon,
                                cityLatitude: response.city.coord.lat,
                                cityName: response.city.name,
                                windDirection: d2d(data_list[i - 1].wind.deg),
                                windDirectionNumber: data_list[i - 1].wind.deg,
                                cloudiness: data_list[i - 1].clouds.all,
                                date_text: convertDate(new Date(data_list[i - 1].dt_txt)).toString()
                            }
                        }
                    }
                    return {
                        temperature: data_list[i - 1].main.temp,
                        pressure: data_list[i - 1].main.pressure,
                        humidity: data_list[i - 1].main.humidity,
                        temp_min: data_list[i - 1].main.temp_min,
                        temp_max: data_list[i - 1].main.temp_max,
                        wind: unit !== 1 ? data_list[i - 1].wind.speed * 3.6 : data_list[i - 1].wind.speed
                    }
                }
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     *
     * @param cityName {String}: Name of the City
     * @param countryCode {String}: Country code in ISO 3166
     * @param date {Date}: Date of the day you want to get the forecast
     * @param advanced {Boolean}: Include advanced stats
     * @param unit {Number}: Temperature unit (undefined = Kelvin, 0 = Celsius, 1 = Fahrenheit)
     * @returns {Promise}: Promise that contains data
     */
    async getForecastByName(cityName, countryCode, date, advanced = false, unit = undefined) {
        let url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName},${countryCode}&APPID=${this.APPKEY}`;
        if (unit !== undefined && unit < 2) url = url.concat(`&units=${units[unit]}`);
        try {
            let response = await fetch(url);
            response = await response.json();
            if (response.size === 0) return Promise.reject({
                cod: '500',
                message: 'City not found'
            });
            let data_list = response.list;
            if ((date.getTime() / 1000) < data_list[0].dt ||
                (date.getTime() / 1000) > data_list[data_list.length - 1].dt) {
                return Promise.reject({
                    cod: '500',
                    message: 'Date must not exceed 5 days from now and it cannot be in the past'
                });
            }
            for (let i = 0; i < data_list.length; i++) {
                if (data_list[i].dt === (date.getTime() / 1000)) {
                    if (advanced) {
                        return {
                            temperature: data_list[i].main.temp,
                            pressure: data_list[i].main.pressure,
                            humidity: data_list[i].main.humidity,
                            temp_min: data_list[i].main.temp_min,
                            temp_max: data_list[i].main.temp_max,
                            wind: unit !== 1 ? data_list[i].wind.speed * 3.6 : data_list[i].wind.speed,
                            advancedStats: {
                                cityLongitude: response.city.coord.lon,
                                cityLatitude: response.city.coord.lat,
                                cityName: response.city.name,
                                windDirection: d2d(data_list[i].wind.deg),
                                windDirectionNumber: data_list[i].wind.deg,
                                cloudiness: data_list[i].clouds.all,
                                date_text: convertDate(new Date(data_list[i].dt_txt)).toString()
                            }
                        }
                    }
                    return {
                        temperature: data_list[i].main.temp,
                        pressure: data_list[i].main.pressure,
                        humidity: data_list[i].main.humidity,
                        temp_min: data_list[i].main.temp_min,
                        temp_max: data_list[i].main.temp_max,
                        wind: unit !== 1 ? data_list[i].wind.speed * 3.6 : data_list[i].wind.speed
                    }
                }
                if (data_list[i].dt > (date.getTime() / 1000)) {
                    if (advanced) {
                        return {
                            temperature: data_list[i - 1].main.temp,
                            pressure: data_list[i - 1].main.pressure,
                            humidity: data_list[i - 1].main.humidity,
                            temp_min: data_list[i - 1].main.temp_min,
                            temp_max: data_list[i - 1].main.temp_max,
                            wind: unit !== 1 ? data_list[i - 1].wind.speed * 3.6 : data_list[i - 1].wind.speed,
                            advancedStats: {
                                cityLongitude: response.city.coord.lon,
                                cityLatitude: response.city.coord.lat,
                                cityName: response.city.name,
                                windDirection: d2d(data_list[i - 1].wind.deg),
                                windDirectionNumber: data_list[i - 1].wind.deg,
                                cloudiness: data_list[i - 1].clouds.all,
                                date_text: convertDate(new Date(data_list[i - 1].dt_txt)).toString()
                            }
                        }
                    }
                    return {
                        temperature: data_list[i - 1].main.temp,
                        pressure: data_list[i - 1].main.pressure,
                        humidity: data_list[i - 1].main.humidity,
                        temp_min: data_list[i - 1].main.temp_min,
                        temp_max: data_list[i - 1].main.temp_max,
                        wind: unit !== 1 ? data_list[i - 1].wind.speed * 3.6 : data_list[i - 1].wind.speed
                    }
                }
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
     *
     * @param lat {Number}: Latitude
     * @param lon {Number}: Longitude
     * @param date {Date}: Date of the day you want to get the forecast
     * @param advanced {Boolean}: Include advanced stats
     * @param unit {Number}: Temperature unit (undefined = Kelvin, 0 = Celsius, 1 = Fahrenheit)
     * @returns {Promise}: Promise that contains data
     */
    async getForecastByCoords(lat, lon, date, advanced = false, unit = undefined) {
        let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${this.APPKEY}`;
        if (unit !== undefined && unit < 2) url = url.concat(`&units=${units[unit]}`);
        try {
            let response = await fetch(url);
            response = await response.json();
            if (response.size === 0) return Promise.reject({
                cod: '500',
                message: 'City not found'
            });
            let data_list = response.list;
            if ((date.getTime() / 1000) < data_list[0].dt ||
                (date.getTime() / 1000) > data_list[data_list.length - 1].dt) {
                return Promise.reject({
                    cod: '500',
                    message: 'Date must not exceed 5 days from now and it cannot be in the past'
                });
            }
            for (let i = 0; i < data_list.length; i++) {
                if (data_list[i].dt === (date.getTime() / 1000)) {
                    if (advanced) {
                        return {
                            temperature: data_list[i].main.temp,
                            pressure: data_list[i].main.pressure,
                            humidity: data_list[i].main.humidity,
                            temp_min: data_list[i].main.temp_min,
                            temp_max: data_list[i].main.temp_max,
                            wind: unit !== 1 ? data_list[i].wind.speed * 3.6 : data_list[i].wind.speed,
                            advancedStats: {
                                cityLongitude: response.city.coord.lon,
                                cityLatitude: response.city.coord.lat,
                                cityName: response.city.name,
                                windDirection: d2d(data_list[i].wind.deg),
                                windDirectionNumber: data_list[i].wind.deg,
                                cloudiness: data_list[i].clouds.all,
                                date_text: convertDate(new Date(data_list[i].dt_txt)).toString()
                            }
                        }
                    }
                    return {
                        temperature: data_list[i].main.temp,
                        pressure: data_list[i].main.pressure,
                        humidity: data_list[i].main.humidity,
                        temp_min: data_list[i].main.temp_min,
                        temp_max: data_list[i].main.temp_max,
                        wind: unit !== 1 ? data_list[i].wind.speed * 3.6 : data_list[i].wind.speed
                    }
                }
                if (data_list[i].dt > (date.getTime() / 1000)) {
                    if (advanced) {
                        return {
                            temperature: data_list[i - 1].main.temp,
                            pressure: data_list[i - 1].main.pressure,
                            humidity: data_list[i - 1].main.humidity,
                            temp_min: data_list[i - 1].main.temp_min,
                            temp_max: data_list[i - 1].main.temp_max,
                            wind: unit !== 1 ? data_list[i - 1].wind.speed * 3.6 : data_list[i - 1].wind.speed,
                            advancedStats: {
                                cityLongitude: response.city.coord.lon,
                                cityLatitude: response.city.coord.lat,
                                cityName: response.city.name,
                                windDirection: d2d(data_list[i - 1].wind.deg),
                                windDirectionNumber: data_list[i - 1].wind.deg,
                                cloudiness: data_list[i - 1].clouds.all,
                                date_text: convertDate(new Date(data_list[i - 1].dt_txt)).toString()
                            }
                        }
                    }
                    return {
                        temperature: data_list[i - 1].main.temp,
                        pressure: data_list[i - 1].main.pressure,
                        humidity: data_list[i - 1].main.humidity,
                        temp_min: data_list[i - 1].main.temp_min,
                        temp_max: data_list[i - 1].main.temp_max,
                        wind: unit !== 1 ? data_list[i - 1].wind.speed * 3.6 : data_list[i - 1].wind.speed
                    }
                }
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

module.exports = Weather;