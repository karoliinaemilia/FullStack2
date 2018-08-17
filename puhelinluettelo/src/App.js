import React from 'react' 
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } 
  return (
    <div className="done">
      {message}
    </div>
  )
}

const AddPerson = (props) => {
  const state = props.state

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: state.newName,
      number: state.newNumber
    }

    const names = state.persons.map(person => person.name)
    const persons = state.persons.concat(personObject)
    if (!names.includes(state.newName)) {
      
      props.resetState(persons)

      personService
        .create(personObject)
        .then(response => {
          props.resetState(state.persons.concat(response.data))
          props.changeDone(`${personObject.name} lisättiin`)
        })

    } else {
      props.updateNumber(persons.find(p => p.name === personObject.name), personObject.number)
    }
  }

  return (
    <div>
      <h3>Lisää uusi</h3>
      <form onSubmit={addPerson}> 
        <div> 
          nimi: 
          <input 
            value={state.newName}
            onChange={props.handeNameChange} /> 
        </div> 
        <div>
          numero: 
          <input 
          value={state.newNumber}
          onChange={props.handleNumberChange}/>
        </div>
        <div> 
          <button type="submit">lisää</button> 
        </div> 
      </form> 
    </div>
  )
}

const ShowPersons = (props) => {
  const state = props.state
  
  const personsToShow = 
      state.filter === '' ?
        state.persons :
          state.persons.filter(person => person.name.toLowerCase().includes(state.filter.toLowerCase()) ||
          person.number.includes(state.filter))

  return (
    <div>
      <h3>Numerot</h3> 
      <table>
        <tbody>
          {personsToShow.map(person => 
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={
              props.deletePerson(person.id, person.name)}>
              poista </button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

class App extends React.Component { 
  constructor(props) { 
    super(props) 
    this.state = { 
      persons: [], 
      newName: '',
      newNumber: '',
      filter: '',
      done: null
    } 
  } 

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  resetState = (value) => {
    this.setState({
      persons: value,
      newName: '',
      newNumber: ''
    })
  }

  changeDone = (message) => {
    this.setState({
      done: message
    })
    setTimeout(() => {
      this.setState({ done: null })
    }, 5000);
  }

  handeNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  deletePerson = (id, name) => {
    return () => {
      if (window.confirm(`poistetaanko ${name}`)) {
        personService.deletePerson(id).then(response => {
          this.setState({
            persons: this.state.persons.filter(person => person.id !== id)
          })
        })
        this.changeDone(`${name} poistettiin`)
      }    
    }
  }

  updateNumber = (person, newNumber) => {
    if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
      const changedContact = {
        ...person, number: newNumber
      }

      personService.changeNumber(person.id, changedContact).then(
        response => {
          this.resetState(this.state.persons.map(p => p.id !== person.id ? p : changedContact))
          this.changeDone(`henkilön ${person.name} numero muutettiin`)
        }
      )
    }
  }
  
  render() {
    return ( 
    <div> 
      <h2>Puhelinluettelo</h2> 
      <Notification message={this.state.done} />
      <div>
        rajaa näytettäviä
        <input 
          value={this.state.filter}
          onChange={this.handleFilterChange}/>
      </div>
      <AddPerson state={this.state} handeNameChange={this.handeNameChange}
      handleNumberChange={this.handleNumberChange} resetState={this.resetState}
      updateNumber={this.updateNumber} changeDone={this.changeDone}/>
      <ShowPersons state={this.state} deletePerson={this.deletePerson} persons={this.state.persons}/>
    </div> 
    ) 
  } 
} 
  
  export default App
