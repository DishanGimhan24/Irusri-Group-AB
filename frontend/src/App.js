// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRegistration from './Components/UserRegistration';
import LoginForm from './Components/LoginForm';
import AddTodo from './Components/AddTodo';
import UserList from './Components/UserList';
import TodoList from './Components/TodoList'
import EditTodo from './Components/EditTodo';


function App() {
  return (
    <BrowserRouter>
 
        <Routes>
          <Route path="/" element={<UserRegistration />} />
          <Route path="/login" element={<LoginForm />} />
           <Route path="/all" element={<UserList/>} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="todo/add" element={<AddTodo/>} />
          <Route path="todo/edit/:id" element={<EditTodo/>} />
        </Routes>

    </BrowserRouter>
  );
}

export default App;
