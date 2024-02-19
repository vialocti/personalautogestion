import React from 'react'
import { useNavigate } from 'react-router-dom';
//import '../css/login.css'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

//import AuthContext from '../contexts/AuthContext';
import Swal from 'sweetalert2'
import { resetpassAgente } from '../services/ServiceConsu'
//var emailValidation= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const schema = yup.object({
    legajo: yup.string().required('legajo es requerido').matches(/^[0-9]+$/, "Deben ser solo números"),
    nrodoc: yup.string().required('nro. documento es requerido').matches(/^[0-9]+$/, "Deben ser solo números"),
    //email: yup.string().required('email requerido').max(255).matches(emailValidation,'Debe ser un email válido'),

})
const ResetPassUserPage = () => {
    
//const { login }= useContext(AuthContext)
 

const navigate = useNavigate()  
  const {register, handleSubmit,formState:{errors}} =useForm({
    resolver : yupResolver(schema)
   });
  
   const onSubmit = async  data =>{
   //console.log(data)
    
    const resp = await resetpassAgente(data.legajo,data.nrodoc)
    if(resp==='N'){
        Swal.fire({
            icon: 'error',
            title: 'Error de Datos',
            text: 'Datos incorrectos legajo o documento'
          })
    }else{
        Swal.fire({
            icon: 'info',
            title: 'Reset PassWord',
            text: 'Password : Nro de Documento'
          })
        navigate('/asistencia')  
    }
    
     
 }

 
 
  return (

    <div className='container'>

        <div className="row  justify-content-center mt-1">
        
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
         <div className="card shadow">
            <div className="card-title text-center border-bottom">
                <h3 className='p-2'> Reset de Password </h3>
            </div>   
            <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label  htmlFor='nrodoc'>Número Documento</label>   
                <input
                    name="nrodoc" 
                    type="text"
                    placeholder="nro de documento" 
                    className="form-control mr-sm-2"     
                    
                    {...register("nrodoc")}
                    /><p>{errors.nrodoc?.message}</p>

            </div>
            <div className='form-group'>
                <label htmlFor='legajo'>Legajo</label>
                <input  
                        name="legajo"
                        type="text"
                        placeholder="Legajo" 
                        className="form-control mr-sm-2"
                       
                        {...register("legajo")}
                    /><p>{errors.legajo?.message}</p>
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

export default ResetPassUserPage



/*
<div className='form-group'>
                <label htmlFor='email'>Correo Electrónico</label>
                <input  
                        name="email"
                        type="text"
                        placeholder="Email" 
                        className="form-control mr-sm-2"
                       
                        {...register("email")}
                    /><p>{errors.email?.message}</p>
            </div>
*/