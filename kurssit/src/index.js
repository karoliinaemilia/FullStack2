import React from 'react' 
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <h1>{props.kurssi}</h1>
  )
}

const Osa = (props) => {
  return (
    <p>{props.osa.nimi} {props.osa.tehtavia}</p>
  )
}

const Sisalto = (props) => {
  const { osat } = props
  const rivit = () => osat.map(osa => <Osa key={osa.id} osa={osa}/>)
    return (
      <div>
        {rivit()}
      </div>
    )
}

const Yhteensa = (props) => {
  const { osat } = props
  const tehtavat = osat.map(osa => osa.tehtavia)
  const reducer = (sum, luku) => sum + luku
  return (
    <p>yhteensä {tehtavat.reduce(reducer)} tehtävää</p>
  )
}

const Kurssi = (props) => {
  const { kurssi } = props
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

const App = () => { 
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys', 
    osat: [
      {
        nimi: 'Reactin perusteet', 
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla', 
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id:3
      },
      {
        nimi: 'Redux',
        tehtavia: 7,
        id: 4
      }
    ]
  } 
  
  return ( 
    <div> 
      <Kurssi kurssi={kurssi} />
    </div> 
  ) 
} 

ReactDOM.render( 
  <App />, 
  document.getElementById('root') 
)
