// DashboardLayout.jsx

import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Header from './Header'; // ✅ Replaces Navbar with Header

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Header activeMenu={activeMenu} /> {/* ✅ Using Header instead of Navbar */}
      {user && (
        <div className="container mx-5 my-4 pt-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
