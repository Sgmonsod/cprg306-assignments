"use client";

import React from 'react';
import { useUserAuth } from './_utils/auth-context';

const LandingPage = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {user ? (
        <div className="text-center">
          <p className="text-xl text-black mb-4">Welcome, {user.displayName} ({user.email})</p>
          <button 
            className="px-4 py-2 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            onClick={handleSignOut}
          >
            Logout
          </button>
          <a 
            className="block mt-4 text-blue-600 hover:text-blue-700 transition duration-300"
            href="/week-8/shopping-list"
          >
            Go to Shopping List
          </a>
        </div>
      ) : (
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          onClick={handleSignIn}
        >
          Login with GitHub
        </button>
      )}
    </div>
  );
};

export default LandingPage;
