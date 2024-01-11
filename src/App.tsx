// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import EmployeePage from './pages/EmployeePage';
import Login from './components/Login';

const App: React.FC = () => {
    const [user, setUser] = useState<{ role: string | null }>({ role: null });

    const handleLogin = (role: string) => {
        setUser({ role });
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={user.role ? <Navigate to={`/${user.role}`} /> : <Login onLogin={handleLogin} />} />
                <Route path="/customer" element={user.role === 'customer' ? <CustomerPage /> : <Navigate to="/login" />} />
                <Route path="/employee" element={user.role === 'employee' ? <EmployeePage /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
