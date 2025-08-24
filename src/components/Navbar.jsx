import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../shared/Logo";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="relative bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-4 sm:py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0">
            <div className="w-[100px] h-[12px] sm:w-[120px] sm:h-[14px] lg:w-[136px] lg:h-[16px]">
              <Logo />
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex space-x-6 lg:space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-base lg:text-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-button-hover font-semibold"
                    : "text-main hover:text-button-hover"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                `text-base lg:text-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-button-hover font-semibold"
                    : "text-main hover:text-button-hover"
                }`
              }
            >
              Catalog
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-main transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-main transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-main transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-32 opacity-100 mt-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-3 pb-4 pt-2 border-t border-lightgray">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "text-button-hover bg-badges font-semibold"
                    : "text-main hover:text-button-hover hover:bg-badges"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "text-button-hover bg-badges font-semibold"
                    : "text-main hover:text-button-hover hover:bg-badges"
                }`
              }
            >
              Catalog
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;