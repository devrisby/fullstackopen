import React, { useState } from 'react'
import './App.css'
import Form from './components/Form'
import Header from './components/Header'
import People from './components/People'
import Search from './components/Search'
import IPerson from './type/IPerson'

function App() {
  const [persons, setPersons] = useState<Array<IPerson>>([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  const handleNameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
  }

  const handlePhoneOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhone(event.target.value)
  }

  const addNewPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(!(newName && newPhone)) {
      alert('Please fill out name and number!')
    }
    else if(persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      
      const newPerson = {
        name: newName,
        phone: newPhone,
        id: persons.slice(-1)[0].id + 1
      }

      console.log(newPerson)

      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewPhone('')
    }
  }

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const filteredPersons = persons.filter(p => p.name.includes(search))

  return (
    <div className="app">
      <Header title='Phonebook' />
      <Search search={search} searchOnChangeHandler={handleSearchOnChange} />
      <Header title='Add Contact' />
      <Form name={newName} nameOnChangeHandler={handleNameOnChange} phone={newPhone} phoneOnChangeHandler={handlePhoneOnChange} onSubmitHandler={addNewPerson} />
      <Header title='Numbers' />
      <People people={filteredPersons} />
    </div>
  )
}

export default App
