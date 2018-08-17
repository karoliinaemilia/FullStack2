import React from 'react';
import axios from 'axios'

const Country = (props) => {

  let title = ''
  if (props.country.name === props.country.nativeName) {
    title = <h1>{props.country.name}</h1>
  } else {
    title = <h1>{props.country.name} {props.country.nativeName}</h1>
  }

  return (
    <div>
      {title}
      <p>capital: {props.country.capital}</p>
      <p>population: {props.country.population}</p>
      <p>
        <img src={props.country.flag} alt='' width='300' length='100'  />
      </p>
    </div>
  )
}

const ShowCountries = (props) => {
  const filter = props.filter

  if (filter === '') {
    return null
  } else {
    const filtered = props.countries.filter(
      country => country.name.toLowerCase().includes(filter.toLowerCase())
    )
    if (filtered.length > 10) {
      return <div>too many matches, specify another filter</div>
    } else if (filtered.length > 1) {
      return <div>{filtered.map(country => <div key={country.alpha3Code}>{country.name}</div>)}</div>
    } else if (filtered.length === 1) {
      const country = filtered[0]
      return <Country country={country} />
    } else {
      return <div>no matches</div>
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {

    return (
      <div>
        find countries: 
        <input 
        onChange={this.handleChange}/>
      <ShowCountries countries={this.state.countries} filter={this.state.filter}/>
      </div>
    )
  }
}

export default App;
