import { Outlet } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function EmpHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="text-slate-600 focus:outline-none focus:text-slate-800"
        >
          <GiHamburgerMenu className="h-6 w-6" />
        </button>
        {menuOpen && (
          <div className="absolute mt-12 w-48 bg-white border border-gray-200 divide-y divide-gray-200 rounded shadow-lg">
            <Link
              to="/employee-home/request-leave"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Request Leave
            </Link>
            <Link
              to="/employee-home"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Home
            </Link>
          </div>
        )}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
