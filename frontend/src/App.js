import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import UserRegistration from './Components/UserRegistration';
import Login from './Components/LoginForm';
import AddTodo from './Components/AddTodo';
import UserList from './Components/UserList';
import TodoList from './Components/TodoList';
import EditTodo from './Components/EditTodo';
import Header from './Components/Header'; // Import the Header component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLoginSuccess = (userEmail) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', userEmail);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  };

  return (
    <BrowserRouter>
      {/* useLocation should be used inside BrowserRouter */}
      <AppContent 
        isLoggedIn={isLoggedIn}
        handleLoginSuccess={handleLoginSuccess}
        handleLogout={handleLogout}
      />
    </BrowserRouter>
  );
}

function AppContent({ isLoggedIn, handleLoginSuccess, handleLogout }) {
  const location = useLocation(); // useLocation inside the context of BrowserRouter

  return (
    <>
      {/* Conditionally render the Header based on the current route */}
      {location.pathname !== '/login' && location.pathname !== '/' && (
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      )}

      <Routes>
        {/* User Registration */}
        <Route path="/" element={<UserRegistration />} />

        {/* Login Page */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

        {/* Protected Routes */}
        <Route path="/all" element={isLoggedIn ? <UserList /> : <Navigate to="/login" />} />
        <Route path="/todo" element={isLoggedIn ? <TodoList /> : <Navigate to="/login" />} />
        <Route path="/todo/add" element={isLoggedIn ? <AddTodo /> : <Navigate to="/login" />} />
        <Route path="/todo/edit/:id" element={isLoggedIn ? <EditTodo /> : <Navigate to="/login" />} />

        {/* Redirect to login after logout */}
        {!isLoggedIn && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
    </>
  );
}

export default App;
