import React from 'react' 

class App extends React.Component { 
  constructor(props) { 
    super(props) 
    this.state = { 
      persons: [ 
        { name: 'Arto Hellas' } 
      ], 
      newName: '' 
    } 
  } 

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName
    }

    const persons = this.state.persons.concat(personObject)

    this.setState({
      persons: persons,
      newName: ''
    })

  }

  handePersonChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  
  render() { 
    return ( 
    <div> 
      <h2>Puhelinluettelo</h2> 
      <form onSubmit={this.addPerson}> 
        <div> 
          nimi: 
          <input 
            value={this.state.newName}
            onChange={this.handePersonChange} /> 
        </div> 
        <div> 
          <button type="submit">lisää</button> 
        </div> 
      </form> 
      <h2>Numerot</h2> 
      <table>
        <tbody>
          {this.state.persons.map(person => 
          <tr key={person.name}>
            <td>{person.name}</td>
          </tr>)}
        </tbody>
      </table>
    </div> 
    ) 
  } 
} 
  
  export default App
