import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/LogIn';
import EmployerHomepage from './pages/EmployerHomepage';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/employer-home" element={<EmployerHomepage />} />
            </Routes>
        </Router>
    );
};

export default App;
