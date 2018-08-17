import React from 'react'

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

export default Kurssi