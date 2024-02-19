import React, { useContext, useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import AuthContext from '../contexts/AuthContext';

import Swal from 'sweetalert2'
import DocumentPdf from '../components/DocumentPdf';
import { PDFViewer } from '@react-pdf/renderer';

const schema = yup.object({
    dias: yup.string().required('dias a justificar es requerido'),
    namejefe: yup.string().required('este campo es requerido'),
  }).required();



const FormInasistencia = () => {

    
  
  
    const {legajo,nombre,condi}= useContext(AuthContext)
    const [mostrar, setMostrar] = useState(false)    
    const [tipomot, setTipomot] = useState('1')
    const [datos, setDatos] = useState(null)
    const [etiquetaobs, setEtiquetaobs] = useState('')
    const [fecha, setFecha] = useState('10/12/2023')
    const [observacion, setObservacion] = useState('sin observacion')

    useEffect(() => {
      
        const limpiar=()=>{
            setTipomot('1')
            setEtiquetaobs('')
            setFecha('')
            setObservacion('')
        }
      
        limpiar()
    
      
    }, [])

    useEffect(() => {
      
        const limpiar=()=>{
            setTipomot('1')
            setEtiquetaobs('')
            setFecha('')
            setObservacion('')
        }
      
        //limpiar()
    
      
    }, [mostrar])
    


    const {register, handleSubmit,formState:{errors}} =useForm({
        resolver : yupResolver(schema)
       });


      function convertirfecha (fe){
        if(fe!==''){
            return  fe.substring(8,10) + '/' + fe.substring(5,7) + '/' + fe.substring(0,4) 
        }
      }

       const onSubmit = data =>{
         
        let datos={}
        //const resp = await autenticarse(data.legajo,data.password)
        //const resp = await login(data.legajo,data.password)
       
        datos.legajo=legajo
        datos.nombre=nombre
        datos.condi=condi
        datos.motivo=tipomot
        datos.dias=data.dias
        datos.jefe=data.namejefe
        datos.fecha=convertirfecha(fecha)
        datos.observacion=data.comentario
        datos.fechaex=fecha
        setDatos(datos)
        
        
        setMostrar(!mostrar)
        //console.log('H',datos)
         
     }   
    
     const onHandleChange =()=>{
        let valueM = document.getElementById('motivo').value
        setTipomot(valueM)
        if(valueM==='3'){
            setEtiquetaobs('Rendire examen de')
        }else if(valueM==='4'){
            setEtiquetaobs('Ingrese Lugar de Congreso')
        }else if(valueM==='5'){
            setEtiquetaobs('Ingrese por el dia o los dias ')
        }else if(valueM==='8'){
            setEtiquetaobs('Familiar Fallecido')
        }else if(valueM==='9'){
            setEtiquetaobs('Otro Motivo')
        }
     }

     const onHandleChangeFecha= e =>{
        setFecha(e.target.value)
     }

     const onHandleChangeObs = e =>{
            setObservacion(e.target.value)
     }

     const onHandleChangeDias = e =>{
     //   setDias(e.target.value)
        }
    const onHandleCerrarPdf=()=>{
        setMostrar(!mostrar)
        
    }
        


  return (

    <div className='container'>
        
        
    
    {!mostrar?
     
    <div className="row" style={{display:'flex', alignContent:'space-between'}}>
    
     <div className="col-xs-12 col-md-4">
            <div className="card" style={{width:'100%'}}>
                
                <div className="card-header">
                    <h4 className='p-2'>Tips Carga formulario</h4>

                </div>
                <div className="card-body">
                    <ul>
                    <li>Elija la opción correcta</li>
                    <li>No mas de 2 razones particulares por mes</li>
                    <li>Algunas opciones requieren agregar mas datos</li>
                    <li>No olvide las constancias que correspondan</li>
                    <li>Todo debe ser enviado a dirección de personal</li>
                    <li>Al Aceptar se le abrira el Pdf que debe descargar</li>
                    <li>No Imprimir por favor!!</li>
                    </ul>
                </div>
            </div>
     </div>   

        
    
    <div className="col-xs-12 col-md-8">
   
    <div className='card' style={{width:'80%',marginLeft:'10px'}}>
    
        <div className="card-header">
        <h3 className='p-2'>Justificacion de Inasistencias</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>


        <div className="form-group">
                <label  htmlFor='dias'>Ingrese días de Inasistencia</label>   
            <input
                id="dias"
                name="dias" 
                type="text"
                placeholder="2 y 3 de Octubre, 1 de Noviembre, 2,3,5 y 8 de Marzo " 
                className="form-control mr-sm-2"     
                onChange={onHandleChangeDias}
                {...register("dias")}
                /><p>{errors.dias?.message}</p>

            </div>

            <div className="form-group">
                <label  htmlFor='dias'>Ingrese Nombre Jefe Inmediato</label>   
            <input
                id="namejefe"
                name="namejefe" 
                type="text"
                placeholder="SARMIENTO, Domingo Faustino " 
                className="form-control mr-sm-2"     
                onChange={onHandleChangeDias}
                {...register("namejefe")}
                /><p>{errors.dias?.message}</p>

            </div>


            <div className="form-group">
                <label  htmlFor='Motivo'>Motivo de Inasistencia</label> 
               
                <select id='motivo' className='form-control' onChange={onHandleChange}>
    
                    <option value="1">RAZONES PARTICULARES CON GOCE DE HABERES</option>
                    <option value="10">RAZONES PARTICULARES SIN GOCE DE HABERES</option>
                    <option value ="2">ARTICULO 102 Decreto 366/06</option>
                    <option value="3">ESTUDIO</option>
                    <option value="4">ASISTENCIA A CONGRESO en</option>
                    <option value="5">COMPENSACIÓN</option>
                    <option value="6">NACIMIENTO HIJO</option>            
                    <option value="7">MATRIMONIO</option>
                    <option value="8">FALLECIMIENTO FAMILIAR</option>
                    <option value="9">OTROS</option>
                 </select>  
            

            </div>

             
        { tipomot==='3' || tipomot==='4' || tipomot==='5' || tipomot==='8' || tipomot==='9'?
        
        <div className='form-group'>
           <br></br>

            <label htmlFor='etiqueta'>{etiquetaobs}</label>
           

            <input  
                    id='comentario'
                    name="comentario"
                    type="text"
                    placeholder="" 
                    className="form-control mr-sm-2"
                    onChange={onHandleChangeObs}
                    {...register("comentario")}
                /><p>{errors.comentario?.message}</p>
        
                </div>
       :<div></div>
        }     
        {tipomot==='3'?
            <div className='form-group'>
                <div></div>
                <label htmlFor='etiqueta'>Fecha Examen</label>
                <input 
                    id='fecha'
                    type='date'
                    value={fecha}
                    onChange={onHandleChangeFecha}
                />
            </div>
        :null

        }
        
         <div className="d-grid m-4">
            <button type="submit" className='btn btn-primary'>Aceptar</button>
        </div>
    
    </form>
   
    </div> 
   
    
    </div>
    </div>
    :
    mostrar?
        
        <div>
             <div>
            <button className='btn btn-info' onClick={onHandleCerrarPdf}>Cerrar Pdf</button>
        </div>
            <PDFViewer style={{width: '80%',height: '80vh'}}>       
            <DocumentPdf datos ={datos}/>
            </PDFViewer>
           
        </div>
    :null
    }
    </div>
    
    


  )
}

export default FormInasistencia