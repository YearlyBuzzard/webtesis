// UserContext.js
import React, { createContext, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const firstName = sessionStorage.getItem('userFirstName');
  const lastName = sessionStorage.getItem('userLastName');

  return (
    <UserContext.Provider value={{ firstName, lastName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
