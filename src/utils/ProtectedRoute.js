import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <Navigate to={"/register"} />
    }
    return children
}

export default ProtectedRoute