import React from 'react' 

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

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const names = this.state.persons.map(person => person.name)
    if (!names.includes(this.state.newName)) {
      const persons = this.state.persons.concat(personObject)

      this.setState({
        persons: persons,
        newName: '',
        newNumber: ''
      })
    } else {
      alert("nimi on jo luettelossa")
      this.setState({
        newName: '',
        newNumber: ''
      })
    }

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
    const personsToShow = 
      this.state.filter === '' ?
        this.state.persons :
          this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()) ||
          person.number.includes(this.state.filter))

    return ( 
    <div> 
      <h2>Puhelinluettelo</h2> 
      <div>
        rajaa näytettäviä
        <input 
          value={this.state.filter}
          onChange={this.handleFilterChange}/>
      </div>
      <h3>Lisää uusi</h3>
      <form onSubmit={this.addPerson}> 
        <div> 
          nimi: 
          <input 
            value={this.state.newName}
            onChange={this.handeNameChange} /> 
        </div> 
        <div>
          numero: 
          <input 
          value={this.state.newNumber}
          onChange={this.handleNumberChange}/>
        </div>
        <div> 
          <button type="submit">lisää</button> 
        </div> 
      </form> 
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
} 
  
  export default App
