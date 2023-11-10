import React from 'react';
import Clock from './Clock';
import UserMenu from './UserMenu';
import NotificationCenter from "./NotificationCenter/NotificationCenter";

const Navbar = ({ userName }) => {
  return (
    <div className="flex justify-between items-center bg-transparent p-4 backdrop-blur-md z-50">
      <div className="flex items-center">
        <Clock/>
      </div>
      <div className="flex items-center space-x-4">
        <UserMenu userName={userName} />
        <NotificationCenter />

      </div>
    </div>
  );
};

export default Navbar;
