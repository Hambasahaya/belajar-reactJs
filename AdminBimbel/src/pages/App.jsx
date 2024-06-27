import React from 'react';

import Header from '../components/Header'
import Hero from '../components/Hero'
import Program from '../components/Program'
import Contac from '../components/Contac'
import About from '../components/About';
import '../css/index.css';

export default function App() {
  return (
    <div className="main d-flex flex-column">
      <Header />
     <Hero/>
     <Program/>
     <About/>
     <Contac/>
</div>
  )
}
  

