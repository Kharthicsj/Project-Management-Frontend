import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import AppLayout from './components/AppLayout';
import Task from './components/Task';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './Redux/ProtectedRoute';
import store from './Redux/store'; 
import "./Styles/Login.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check for authentication on component mount and store it in state
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  const handleLogout = () => {
    localStorage.removeItem('authToken');  // Clear the token from localStorage
    setIsAuthenticated(false);  // Update the state
    navigate('/login');  // Redirect to login page
  };

  return (
    <Provider store={store}>
      <div>
        <Toaster position="top-right" gutter={8} />

        {isAuthRoute ? (
          // Only render Login or Signup component without AppLayout
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        ) : (
          // Render AppLayout for all other routes and protect certain routes
          <AppLayout>
            <div className="logout-container">
              {isAuthenticated && (
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              )}
            </div>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <div className="flex flex-col items-center w-full pt-10">
                      <img src="./image/welcome.svg" className="w-5/12" alt="Welcome" />
                      <h1 className="text-lg text-gray-600">Select or create new project</h1>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/:projectId"
                element={
                  <ProtectedRoute>
                    <Task />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AppLayout>
        )}
      </div>
    </Provider>
  );
}

export default App;
