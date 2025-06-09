import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../shared/Logo";

const Navbar = () => {
  return (
    <nav className='relative'>
      <div className="container mx-auto px-[64px] py-[24px] flex justify-center items-center ">

         <NavLink to="/" className="absolute left-6 top-1/2 -translate-y-1/2">
          <div className="w-[136px] h-[16px]">
            <Logo />
          </div>
        </NavLink>

        <div className="space-x-6 flex">
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
