// import React, { Component } from 'react' // for class based
import React from 'react'
import loader from './loader.gif'
// export class Spinner extends Component {  --for class based
const Spinner =()=>{
  // render() { -- for class based
    return (
      <div className="text-center">
        <img src={loader} alt="loader"/>
      </div>
    )
  // }
}

export default Spinner
