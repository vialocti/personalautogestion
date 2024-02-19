import React,{useContext} from 'react'
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {changepassAgente} from '../services/ServiceConsu'
import AuthContext from '../contexts/AuthContext'
import Swal from 'sweetalert2';
import '../css/cambiarclave.css'

const schema = yup.object({
  legajo: yup.string().required('legajo es requerido').matches(/^[0-9]+$/, "Deben ser solo digitos"),
  passold: yup.string().required('password actual requerida').matches(/^[0-9]+$/, "Deben ser solo digitos"),
  passnew: yup.string().required('debe ingresar una nueva password').matches(/^[0-9]+$/, "Deben ser solo digitos").min(4,"Minimo 4 digitos").max(8,"Maximo 8 digitos"),

}).required();

const CambiarClave = () => {
  const {logout}= useContext(AuthContext)

    const {register, handleSubmit,formState:{errors}} =useForm({
     resolver : yupResolver(schema)
    });

  const onSubmit =async  data =>{
      
      let legajo = data.legajo;
      let passold = data.passold;
      let passnew = data.passnew;
      //console.log(legajo, passold, passnew)
      const resp = await changepassAgente(legajo,passold,passnew) 
      if(resp.data.affectedRows===1){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Clave cambiada, debe reiniciar sesion',
          showConfirmButton: false,
          timer: 2500})
          logout()   
        }else if(resp.data.affectedRows===0){
          Swal.fire({
            icon: 'error',
            title: 'Error de datos',
            text: 'Legajo o Password Actual incorrecto'
          })
        }

    }


  return (
    <div className='container'>
      
       <div className="row">
       
       <div className="col xs-12 md-6">
       
            <div className='card'>
        
                <div className="card-title text-center border-bottom">
                    <h3 className='p-3'> Cambiar Clave </h3>
                </div>  
            
              <div className="card-body">
              
                <form onSubmit={handleSubmit(onSubmit)}>
         
                          
                     
                <div className='form-group'>
                    <label htmlFor="legajo">Legajo del Agente</label>
                    <input type="text" 
                    {...register("legajo")} 
                  /><p>{errors.legajo?.message}</p>
                </div>
                <div className='form-group'>
                    <label htmlFor="passold">Password Actual</label>
                    <input type="text" 
                    {...register("passold")} 
                  /><p>{errors.passold?.message}</p>
              </div>
              
                           
         
              <div className='form-group'>
                <label htmlFor="passnew">Nuevo Password</label>
                <input type="text" 
                {...register("passnew")} 
                /><p>{errors.passnew?.message}</p>
              </div>
          
               
                <div className='form-group'>
                  <button type="submit"className='btn btn-warning'>
                    Cambiar Clave
                </button>
              </div>

            </form>
          </div>
          </div>
        </div>
       

        <div className='col xs-12 md-6'>
          <div className="card">
            <div className="card-header">
            <h5 className="card-title">Importante: Actualización Password</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Las claves son numericas</li>
                <li className="list-group-item"> Deben poseer una longitud de 4 a 8 digitos</li>
                <li className="list-group-item"> Puenden comenzar con el digito 0</li>
                <li className="list-group-item"></li>
              </ul>
              <div className="card-header">
                <h6 className="card-subtitle mb-2 text-muted">Contacto:</h6>
                <h6 className="card-subtitle mb-2 text-muted">alfredo.brizuela@fce.uncu.edu.ar</h6>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  )
}

export default CambiarClave