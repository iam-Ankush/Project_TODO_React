import React from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'

const PrivateRoute = ({allowedRoles}) => {
    console.log(allowedRoles , 'Allowe roles')
    const navigate = useNavigate()
    let userRole = null

    const token = localStorage.getItem('token')
    if(!token){
        navigate('/login')
    }

    try {
        const parts = token.split('_')
            console.log(parts)
            if(parts.length >= 3){
               
                userRole = parts[2]
            }
           
            console.log(userRole)
            if(allowedRoles.includes(userRole)){
                return <Outlet />
            } else {
                return <Navigate to="/unauthorized" replace />; // Not allowed: redirect
            }
    } catch (error) {
        console.error('Error decoding token:', error);
    }
    // return <Component {...rest}  />
}

export default PrivateRoute
