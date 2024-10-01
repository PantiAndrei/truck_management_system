// frontend/src/components/Logout.js

import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Logout({ handleLogout }) {
  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return <Navigate to="/" />;
}

export default Logout;
