import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Context/ContextProvider.jsx';
import SignUp from './Pages/SignUp.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';

const App = () => {
  const { user, isUserLoading } = useAuth();

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-blue-600 font-bold text-xl">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        <Route path="/dashboard" element={user ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
