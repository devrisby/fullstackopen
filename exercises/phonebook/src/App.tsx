import React, { useState, useEffect } from 'react'
import './App.css'
import Form from './components/Form'
import Header from './components/Header'
import People from './components/People'
import Search from './components/Search'
import IPerson from './type/IPerson'

import * as PersonService from './services/PersonService'

function App() {
  const [persons, setPersons] = useState<Array<IPerson>>([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async() => {
      setPersons((await PersonService.getAll()).data)
    }

    fetchData()
  }, [])

  const handleNameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
  }

  const handlePhoneOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhone(event.target.value)
  }

  const addNewPerson = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(!(newName && newPhone)) {
      alert('Please fill out name and number!')
    }
    else if(persons.some(p => p.name === newName)) {
      const matchedPerson = persons.find(p => p.name === newName)

      if(matchedPerson === undefined) {
        throw new TypeError()
      }

      if(matchedPerson.phone !== newPhone && confirm(`${matchedPerson?.name} is already added to phonebook. Replace old number with new one?`)) {
        matchedPerson.phone = newPhone
        setPersons(persons.map(p => p.id !== matchedPerson.id ? p: matchedPerson))
        await PersonService.update(matchedPerson.id, matchedPerson);
      } else {
        alert(`${newName} is already added to phonebook`)
      }
    } else {
      
      const newPersonDTO = {
        name: newName,
        phone: newPhone
      }

      const response = await PersonService.create(newPersonDTO);

      console.log(response.data)

      setPersons(persons.concat(response.data))
      setNewName('')
      setNewPhone('')
    }
  }

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const filteredPersons = persons.filter(p => p.name.includes(search))

  const handleDeleteOnClick = async (person: IPerson) => {
    if(confirm(`Delete ${person.name}?`)){
      setPersons(persons.filter(p => p.id != person.id))
      await PersonService.remove(person.id);
    }
  }

  return (
    <div className="app">
      <Header title='Phonebook' />
      <Search search={search} searchOnChangeHandler={handleSearchOnChange} />
      <Header title='Add Contact' />
      <Form name={newName} nameOnChangeHandler={handleNameOnChange} phone={newPhone} phoneOnChangeHandler={handlePhoneOnChange} onSubmitHandler={addNewPerson} />
      <Header title='Numbers' />
      <People people={filteredPersons} handleDelete={handleDeleteOnClick} />
    </div>
  )
}

export default App
