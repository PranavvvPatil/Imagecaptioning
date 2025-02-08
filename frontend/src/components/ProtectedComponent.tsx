import React from 'react';
import { useAuth } from '../contexts/authContext';

const ProtectedComponent: React.FC = () => {
  const { userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    return <div>You do not have access to this page.</div>;
  }

  return (
    <div>
      <h1>Welcome to the Protected Component!</h1>
      <p>This content is only visible to logged-in users.</p>
    </div>
  );
};

export default ProtectedComponent;
