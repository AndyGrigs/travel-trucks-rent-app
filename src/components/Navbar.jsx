import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../shared/Logo'

const Navbar = () => {
  return (
    <nav>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <NavLink to='/'><Logo/></NavLink>
              <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold'
                : 'text-gray-700 hover:text-blue-600'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold'
                : 'text-gray-700 hover:text-blue-600'
            }
          >
            Catalog
          </NavLink>
        </div>
        </div>
    </nav>
  )
}

export default Navbar