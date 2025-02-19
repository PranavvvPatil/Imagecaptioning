import React from 'react';
import { useAuth } from '../contexts/authContext';


const ProtectedComponent: React.FC = () => {
  const { userLoggedIn } = useAuth();
  console.log("User Logged In:", userLoggedIn);

  if (!userLoggedIn) {
    return (
      <h1>
         You do not have access to this page.
      </h1>
         
        
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Welcome to the Protected Component!
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-lg text-gray-700">
          This content is only visible to logged-in users.
        </p>
      </div>
    </div>
  );
};

export default ProtectedComponent;