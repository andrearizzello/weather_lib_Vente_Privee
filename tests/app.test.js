const Weather = require('../app');

let weathObj = new Weather(process.env.APIKEY);

describe("Simple check define variables", () => {
    it("Test to check if APIKEY is setted", () => {
        expect.assertions(1);
        expect(process.env.APIKEY).toBeDefined()
    });
    it("Test to check if the constructor works properly", () => {
        expect.assertions(1);
        expect(weathObj).toBeDefined()
    });
});

describe("Tests for function getCurrentWeatherByID", () => {
    it("Test with ADVANCED prop set to FALSE", () => {
        return weathObj.getCurrentWeatherByID(2968815, false, 0)
            .then(result => {
                expect(result).toEqual({
                    temperature: expect.any(Number),
                    pressure: expect.any(Number),
                    humidity: expect.any(Number),
                    temp_min: expect.any(Number),
                    temp_max: expect.any(Number),
                    wind: expect.any(Number)
                })
            }).catch(reason => {
                expect(reason).toEqual({
                    cod: expect.any(String),
                    message: expect.any(String)
                })
            });
    });
    it("Test with ADVANCED prop set to TRUE", () => {
        return weathObj.getCurrentWeatherByID(2968815, true, 0)
            .then(result => {
                expect(result).toEqual({
                    temperature: expect.any(Number),
                    pressure: expect.any(Number),
                    humidity: expect.any(Number),
                    temp_min: expect.any(Number),
                    temp_max: expect.any(Number),
                    wind: expect.any(Number),
                    advancedStats: {
                        cityLatitude: expect.any(Number),
                        cityLongitude: expect.any(Number),
                        cityName: expect.any(String),
                        cloudiness: expect.any(Number),
                        windDirection: expect.any(String),
                        windDirectionNumber: expect.any(Number),
                    },
                })
            }).catch(reason => {
                expect(reason).toEqual({
                    cod: expect.any(String),
                    message: expect.any(String)
                })
            });
    });
});

describe("Tests for function getCurrentWeatherByName", () => {
    it("Test with ADVANCED prop set to FALSE", () => {
        return weathObj.getCurrentWeatherByName("Paris", "FR", false, 0)
            .then(result => {
                expect(result).toEqual({
                    temperature: expect.any(Number),
                    pressure: expect.any(Number),
                    humidity: expect.any(Number),
                    temp_min: expect.any(Number),
                    temp_max: expect.any(Number),
                    wind: expect.any(Number)
                })
            }).catch(reason => {
                expect(reason).toEqual({
                    cod: expect.any(String),
                    message: expect.any(String)
                })
            });
    });
    it("Test with ADVANCED prop set to TRUE", () => {
        return weathObj.getCurrentWeatherByName("Paris", "FR", true, 0)
            .then(result => {
                expect(result).toEqual({
                    temperature: expect.any(Number),
                    pressure: expect.any(Number),
                    humidity: expect.any(Number),
                    temp_min: expect.any(Number),
                    temp_max: expect.any(Number),
                    wind: expect.any(Number),
                    advancedStats: {
                        cityLatitude: expect.any(Number),
                        cityLongitude: expect.any(Number),
                        cityName: expect.any(String),
                        cloudiness: expect.any(Number),
                        windDirection: expect.any(String),
                        windDirectionNumber: expect.any(Number),
                    }
                })
            }).catch(reason => {
                expect(reason).toEqual({
                    cod: expect.any(String),
                    message: expect.any(String)
                })
            });
    })
});

describe("Tests for function getCurrentWeatherByCoords", () => {
    it("Test with ADVANCED prop set to FALSE", () => {
        return weathObj.getCurrentWeatherByCoords(48.8566, 2.3515, false, 0)
            .then(result => {
                expect(result).toEqual({
                    temperature: expect.any(Number),
                    pressure: expect.any(Number),
                    humidity: expect.any(Number),
                    temp_min: expect.any(Number),
                    temp_max: expect.any(Number),
                    wind: expect.any(Number)
                })
            }).catch(reason => {
                expect(reason).toEqual({
                    cod: expect.any(String),
                    message: expect.any(String)
                })
            });
    });
    it("Test with ADVANCED prop set to TRUE", () => {
        return weathObj.getCurrentWeatherByCoords(48.8566, 2.3515, true, 0)
            .then(result => {
                expect(result).toEqual({
                    temperature: expect.any(Number),
                    pressure: expect.any(Number),
                    humidity: expect.any(Number),
                    temp_min: expect.any(Number),
                    temp_max: expect.any(Number),
                    wind: expect.any(Number),
                    advancedStats: {
                        cityLatitude: expect.any(Number),
                        cityLongitude: expect.any(Number),
                        cityName: expect.any(String),
                        cloudiness: expect.any(Number),
                        windDirection: expect.any(String),
                        windDirectionNumber: expect.any(Number),
                    }
                })
            }).catch(reason => {
                expect(reason).toEqual({
                    cod: expect.any(String),
                    message: expect.any(String)
                })
            });
    })
});

describe("Tests for function getForecastByID", () => {
    it("Test with ADVANCED prop set to FALSE", () => {
        return weathObj.getForecastByID(2968815, new Date('02/03/2019 9:00'), false, 0)
            .then(result => {
                expect(result).toEqual({
                    temperature: expect.any(Number),
                    pressure: expect.any(Number),
                    humidity: expect.any(Number),
                    temp_min: expect.any(Number),
                    temp_max: expect.any(Number),
                    wind: expect.any(Number)
                })
            }).catch(reason => {
                expect(reason).toEqual({
                    cod: expect.any(String),
                    message: expect.any(String)
                })
            });
    });
    it("Test with ADVANCED prop set to TRUE", () => {
        return weathObj.getForecastByID(2968815, new Date('02/03/2019 9:00'), true, 0)
            .then(result => {
                expect(result).toEqual({
                    temperature: expect.any(Number),
                    pressure: expect.any(Number),
                    humidity: expect.any(Number),
                    temp_min: expect.any(Number),
                    temp_max: expect.any(Number),
                    wind: expect.any(Number),
                    advancedStats: {
                        cityLongitude: expect.any(Number),
                        cityLatitude: expect.any(Number),
                        cityName: expect.any(String),
                        windDirection: expect.any(String),
                        windDirectionNumber: expect.any(Number),
                        cloudiness: expect.any(Number),
                        date_text: expect.any(String)
                    }
                })
            }).catch(reason => {
                expect(reason).toEqual({
                    cod: expect.any(String),
                    message: expect.any(String)
                })
            });
    });
});

describe("Tests for function getForecastByName", () => {
    it("Test with ADVANCED prop set to FALSE", () => {
        return weathObj.getForecastByName("Paris", 'FR', new Date('02/03/2019 9:00'), false, 0)
            .then(result => {
                expect(result).toEqual({
                    temperature: expect.any(Number),
                    pressure: expect.any(Number),
                    humidity: expect.any(Number),
                    temp_min: expect.any(Number),
                    temp_max: expect.any(Number),
                    wind: expect.any(Number)
                })
            }).catch(reason => {
                expect(reason).toEqual({
                    cod: expect.any(String),
                    message: expect.any(String)
                })
            });
    });
    it("Test with ADVANCED prop set to TRUE", () => {
        return weathObj.getForecastByName("Paris", 'FR', new Date('02/03/2019 9:00'), true, 0)
            .then(result => {
                expect(result).toEqual({
                    temperature: expect.any(Number),
                    pressure: expect.any(Number),
                    humidity: expect.any(Number),
                    temp_min: expect.any(Number),
                    temp_max: expect.any(Number),
                    wind: expect.any(Number),
                    advancedStats: {
                        cityLongitude: expect.any(Number),
                        cityLatitude: expect.any(Number),
                        cityName: expect.any(String),
                        windDirection: expect.any(String),
                        windDirectionNumber: expect.any(Number),
                        cloudiness: expect.any(Number),
                        date_text: expect.any(String)
                    }
                })
            }).catch(reason => {
                expect(reason).toEqual({
                    cod: expect.any(String),
                    message: expect.any(String)
                })
            });
    })
});

describe("Tests for function getForecastByCoord", () => {
    it("Test with ADVANCED prop set to FALSE", () => {
        return weathObj.getForecastByCoords(48.8566, 2.3515, new Date("02/03/2019 9:00"), false, 0)
            .then(result => {
                expect(result).toEqual({
                    temperature: expect.any(Number),
                    pressure: expect.any(Number),
                    humidity: expect.any(Number),
                    temp_min: expect.any(Number),
                    temp_max: expect.any(Number),
                    wind: expect.any(Number)
                })
            }).catch(reason => {
                expect(reason).toEqual({
                    cod: expect.any(String),
                    message: expect.any(String)
                })
            });
    });
    it("Test with ADVANCED prop set to TRUE", () => {
        return weathObj.getForecastByCoords(48.8566, 2.3515, new Date("02/03/2019 9:00"), true, 0)
            .then(result => {
                expect(result).toEqual({
                    temperature: expect.any(Number),
                    pressure: expect.any(Number),
                    humidity: expect.any(Number),
                    temp_min: expect.any(Number),
                    temp_max: expect.any(Number),
                    wind: expect.any(Number),
                    advancedStats: {
                        cityLongitude: expect.any(Number),
                        cityLatitude: expect.any(Number),
                        cityName: expect.any(String),
                        windDirection: expect.any(String),
                        windDirectionNumber: expect.any(Number),
                        cloudiness: expect.any(Number),
                        date_text: expect.any(String)
                    }
                })
            }).catch(reason => {
                expect(reason).toEqual({
                    cod: expect.any(String),
                    message: expect.any(String)
                })
            });
    })
});