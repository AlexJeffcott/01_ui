import React from 'react'
import {
  Link
} from 'react-router-dom'

export default function Nav () {
  return (
    <div className="navContainer">
      <Link to="/">Home</Link>
      <Link to="/assets">All Assets</Link>
    </div>
  )
}
