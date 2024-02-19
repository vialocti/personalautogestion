import React,{ useContext} from 'react'

//import '../css/login.css'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import AuthContext from '../contexts/AuthContext';
import Swal from 'sweetalert2'

const schema = yup.object({
    legajo: yup.string().required('legajo es requerido').matches(/^[0-9]+$/, "Deben ser solo digitos"),
    password: yup.string().required('password es requerida').matches(/^[0-9]+$/, "Deben ser solo digitos"),
  }).required();


const LoginPage = () => {
    
const { login}= useContext(AuthContext)
 

    
  const {register, handleSubmit,formState:{errors}} =useForm({
    resolver : yupResolver(schema)
   });
  
   const onSubmit = async  data =>{
   
    //const resp = await autenticarse(data.legajo,data.password)
    const resp = await login(data.legajo,data.password)
    //console.log(resp)
    if(resp===0){
        Swal.fire({
            icon: 'error',
            title: 'Error de Datos',
            text: 'Legajo o Password Incorrecto'
          })
    }
    if(resp===10){
      Swal.fire({
          icon: 'error',
          title: 'Error Server',
          text: 'informe a personal'
        })
  }
    
     
 }

 
 
  return (

    <div className='container'>

        <div className="row  justify-content-center mt-3">
        
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
         <div className="card shadow">
            <div className="card-title text-center border-bottom">
                <h3 className='p-2'> Login </h3>
            </div>   
            <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label  htmlFor='legajo'>Legajo</label>   
                <input
                    name="legajo" 
                    type="text"
                    placeholder="Legajo" 
                    className="form-control mr-sm-2"     
                    
                    {...register("legajo")}
                    /><p>{errors.legajo?.message}</p>

            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input  
                        name="password"
                        type="password"
                        placeholder="Password" 
                        className="form-control mr-sm-2"
                       
                        {...register("password")}
                    /><p>{errors.password?.message}</p>
            </div>
             <div className="d-grid mt-4">
                <button type="submit" className='btn btn-primary'>Aceptar</button>
            </div>
        
        </form>
        </div>
        </div>
        </div>
        
        </div>
    </div>
  )
}

export default LoginPage