import React from 'react'
import Kurssi from './components/Kurssi'

const App = ({ kurssit }) => { 
  
  const rivit = () => kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)
  
  return ( 
    <div> 
      <h1>Opetusohjelma</h1>
      {rivit()}
    </div> 
  ) 
} 

export default App