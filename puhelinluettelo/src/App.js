import React from 'react' 

const AddPerson = (props) => {
  const state = props.state

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: state.newName,
      number: state.newNumber
    }

    const names = state.persons.map(person => person.name)
    if (!names.includes(state.newName)) {
      const persons = state.persons.concat(personObject)

      props.resetState(persons)
    } else {
      alert("nimi on jo luettelossa")
      props.resetState(state.persons)
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
      persons: [ 
        { 
          name: 'Arto Hellas',
          number: '040-123456'
        },
        {
          name: 'Martti Tienari',
          number: '040-123456'
        },
        {
          name: 'Arto Järvinen',
          number: '040-123456'
        },
        {
          name: 'Lea Kutvonen',
          number: '040-123456'
        }
      ], 
      newName: '',
      newNumber: '',
      filter: ''
    } 
  } 

  resetState = (value) => {
    this.setState({
      persons: value,
      newName: '',
      newNumber: ''
    })
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
  
  render() {
    return ( 
    <div> 
      <h2>Puhelinluettelo</h2> 
      <div>
        rajaa näytettäviä
        <input 
          value={this.state.filter}
          onChange={this.handleFilterChange}/>
      </div>
      <AddPerson state={this.state} handeNameChange={this.handeNameChange}
      handleNumberChange={this.handleNumberChange} resetState={this.resetState}/>
      <ShowPersons state={this.state} />
    </div> 
    ) 
  } 
} 
  
  export default App
