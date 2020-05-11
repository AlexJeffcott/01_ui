import React from 'react'
import {
  Link
} from 'react-router-dom'

function NavUI () {
  return (
    <div className="navContainer">
      <Link to="/">Home</Link>
      <Link to="/assets">All Assets</Link>
    </div>
  )
}

export default NavUI
