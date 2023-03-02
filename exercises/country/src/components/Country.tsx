import { useEffect, useState } from "react";
import ICountry from "../types/ICountry";
import IWeather from "../types/IWeather";
import WeatherService from '../services/WeatherService'

interface PropTypes {
    country: ICountry;
}

const Country = ({country}: PropTypes) => {

    const [weather, setWeather] = useState({
        temp: 0.0,
        windSpeed: 0.0,
        icon: ''
    })

    useEffect(() => {
        const fetchData = async() => {
            if(country.capital){
                setWeather(await WeatherService.getWeather(country));
            }
        }

        fetchData()
    }, [])


    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {country.languages.map((l,i) => <li key={i}>{l}</li>)}
            </ul>
            <img src={country.flag} alt={country.flagAlt} />
            {country.capital && (
                <div>
                    <h3>Weather in {country.capital}</h3>
                    <p>Temperature {weather.temp}</p>
                    <img src={weather.icon} alt="Weather icon" />
                    <p>Wind {weather.windSpeed} m/s</p>
                </div>
            )}
        </div>
    )
}

export default Country;