import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../shared/Logo";

const Navbar = () => {
  return (
    <nav>
      <div className="container mx-auto px-[64px] py-[24px] flex justify-between items-center">
        <NavLink to="/">
          <Logo className='w-[136px] h-[16px]'/>
        </NavLink>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
         ? "text-button-hover font-semibold"
          : "text-main"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
             isActive
          ? "text-button-hover font-semibold"
          : "text-main"
            }
          >
            Catalog
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
