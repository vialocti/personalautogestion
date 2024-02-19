import React, {useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
//import { PRIVATE } from '../../config/routes/routes'



const PublicRoutes = () => {
    
    const {isLoged} = useContext(AuthContext)
    
    if(isLoged){
        return(
        <Navigate to={ '/asistencia' } />
    )}

    return (
    <div>
     <Outlet />  
    </div>
  )
}

export default PublicRoutes