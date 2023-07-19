import React from 'react'
import Propgrops from '../components/Propgrops';
import { useState } from 'react';

function Main() {
    const [inputdata,setInputdata]=useState()
  const valuede = (data)=> {
    setInputdata(data)
  }
  return (
    <div>
      <Propgrops sasuke={valuede}/>
      <p>{inputdata}</p>
    </div>
  )
}

export default Main
