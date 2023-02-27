import ICountry from "../types/ICountry";
import Country from "./Country";

interface PropTypes {
    countries: Array<ICountry>;
}

const Countries = ({countries}: PropTypes) => {
    if(countries.length === 1) {
        return <Country country={countries[0]} />
    } else {
        return (
            <div>
                {countries.map((c,i) => <p key={i}>{c.name}</p>)}
            </div>
        )
    }
}

export default Countries;