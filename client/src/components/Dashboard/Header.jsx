import React from 'react';
import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header className="flex flex-col items-center justify-between py-4 md:px-4 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-500 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-white mb-4">Employee Management Software</h1>
      <div className="flex items-center justify-between w-full md:space-x-4">
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 rounded-md text-white font-semibold bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Add Employee
        </button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
