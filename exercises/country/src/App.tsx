import { useState, useEffect } from 'react'
import './App.css'
import Countries from './components/Countries'
import Search from './components/Search'
import CountryService from './services/CountryService'
import ICountry from './types/ICountry'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState<Array<ICountry>>([])

  useEffect(() => {
    const fetchData = async() => {
      setCountries((await CountryService.getAll()))
    }

    fetchData()
  }, [])

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  return (
    <div className="app">
      <Search search={search} onChange={handleSearchOnChange} />
      <Countries countries={countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))} />
    </div>
  )
}

export default App
