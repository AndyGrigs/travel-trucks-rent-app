import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../shared/Logo'

const Navbar = () => {
  return (
    <nav>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <NavLink to='/'><Logo/></NavLink>
        </div>
    </nav>
  )
}

export default Navbar