import axios from "axios";

const baseURL = "https://restcountries.com/v3.1"

const getAll = async () => {
    const allCountries = (await axios.get(baseURL+'/all')).data

    // @ts-ignore
    return allCountries.map(c => {
        // console.log("capitalInfo", c.capitalInfo.latlng[0]);

        return {
            "name": c.name.common,
            "capital": c.capital? c.capital[0]: 'N/A',
            "area": c.area,
            "languages": c.languages ? Object.values(c.languages): [],
            "flag": c.flags.png,
            "flagAlt": c.flags.alt,
            "capitalLat": c.capitalInfo.latnlng ? c.capitalInfo.latlng[0]: -1,
            "capitalLong": c.capitalInfo.latnlng ? c.capitalInfo.latlng[1]: -1,
        }
    })
}

export default {
    getAll,
}