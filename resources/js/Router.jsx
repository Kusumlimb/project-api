import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Page/Login';
import Register from './Page/Register';
import TodoList from './Page/TodoList';



const AppRouter = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;