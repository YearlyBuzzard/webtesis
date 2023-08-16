import React from 'react';
import Clock from './Clock';
import UserMenu from './UserMenu';
import WeatherComponent from './WeatherComponent';

const Navbar = ({ userName }) => {
  return (
    <div className="flex justify-between items-center bg-transparent p-4 backdrop-blur-md">
      <div className="flex items-center">
        <Clock />
        <div className="mx-4">
        </div>
      </div>
      <UserMenu userName={userName} />
    </div>
  );
};

export default Navbar;
