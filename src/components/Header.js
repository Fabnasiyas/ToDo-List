import React from 'react'
import { useState } from 'react'

const Header = () => {
  const [count,setcount]=useState(0)
  return (
    <>
    <h1>Header section</h1>
    <button onClick={()=>{setcount(count+1)}}>increment</button>
    <h1>count={count}</h1>
    </>
  )
}

export default Header