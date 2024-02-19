import React,{useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
//import { LOGIN } from '../../config/routes/routes'



const PrivateRoutes =()=>{
    const {isLoged}= useContext(AuthContext)
    
    if(!isLoged){
        return(
            
            <Navigate to ={'/'}/>
        )
    }
    return(
        <div>
      <Outlet />
        </div>
    )

}


export default PrivateRoutes