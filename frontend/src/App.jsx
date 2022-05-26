import React from 'react'
import './App.css'
import Login from './pages/auth/login'
import Logout from './pages/auth/logout'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Main from "./pages/auth/Main"
import useAuth from "./components/auth/useAuth"

function App() {

  function PrivateRoute({ children }) {
    const auth = useAuth();
    return auth ? children : <Navigate to="/login" />;
  }

  return (
    <Router forceRefresh={true}>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route exact path="/main" element={
          <PrivateRoute>
            <Main/>  
          </PrivateRoute>
          } />
      </Routes>
    </Router>
  )
}

export default App