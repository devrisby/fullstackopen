import axios from "axios";
import ICountry from "../types/ICountry";

const baseURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&"
const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = async (country: ICountry) => {
    
    const url = baseURL + `lat=${country.capitalLat}&lon=${country.capitalLong}&appid=${api_key}`
    console.log("API KEY", api_key, "\nURL", url);
    console.log("country:", country)
    const response = (await axios.get(url)).data
    console.log("temp", response.main.temp)
    return {
        temp: response.main.temp,
        windSpeed: response.wind.speed,
        icon: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    }
}
    

export default {
    getWeather
}