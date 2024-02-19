import React, {useState,useContext, useEffect} from 'react'

//import {useForm} from 'react-hook-form'
//import { yupResolver } from '@hookform/resolvers/yup'
//import * as yup from 'yup'
import AuthContext from '../contexts/AuthContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { URI_BIO } from '../utils/constants';


//const uri = 'http://200.12.136.74:4000/biometrico/'
const uri = URI_BIO

 
const AsistenciaVirtualPage = () => {
   const {legajo,nombre,condi}= useContext(AuthContext)
    const [hora, setHora] = useState('')
    const [fecha, setFecha] = useState('')
    //const [horasT, setHorasT] = useState(null)
    // const [nroreg, setNroreg] = useState(null)
    //const [asistencia, setAsistencia] =useState([])
    const [ruta, setRuta] = useState(`${uri}/horario_persofechas/28367/9/2122-09-01/2122-09-23`)


    const navigate = useNavigate()
      
    const ti =()=>{
         const fechahoy = new Date()
          let hora=fechahoy.getHours()<10? '0' + fechahoy.getHours():fechahoy.getHours()
          let minutos = fechahoy.getMinutes()<10? '0'+fechahoy.getMinutes():fechahoy.getMinutes()
          let horatext= hora + ':' + minutos
          return horatext
          
    }


    
    useEffect(() => {
      
      const convertirFecha=fechahoy=>{
          
          let dia = fechahoy.getDate() <10?'0'+fechahoy.getDate():fechahoy.getDate()
          let mes = fechahoy.getMonth()+1 <10? '0' + (fechahoy.getMonth()+1):fechahoy.getMonth()+1
          let anio = fechahoy.getFullYear()
          let fechatext = anio + '-' + mes + '-' + dia
          setFecha(fechatext)
          setRuta(`${uri}/horario_persofechas/${condi}/${legajo}/${fechatext}/${fechatext}`)
          setHora(ti())  
              
      }
      
       
      const fechahoy = new Date()
    

     convertirFecha(fechahoy)
     


     
    }, [condi,legajo])
    
    
    
    
    const getAsistencia = async  () => {
      //console.log(ruta)
          
      try{
  
        const res = await axios.get(ruta)
        //await setAsistencia(res.data)
        return await res.data
           
    }catch(error){
        console.log(error)
    }
    
  
    }

   //cargar salida update al registro de entrada
  const grabarSalida = async (legajo,condi,hora,nroregistro,horastr) =>{
     //console.log(legajo,condi,hora,horastr,nroregistro)
    try {
      const resu = await axios.put(
        `${uri}/registrosalida/${condi}/${legajo}/${nroregistro}`,
        {horastr, hora}
        )
      //console.log(resu)
    } catch (error) {
      console.log(error)
    }
     
  }  

  //cargar nuevo registro
  const grabarNuevoRegistro= async (legajo,condi,fecha,hora)=>{
    //console.log(condi,legajo,fecha,hora)
    
    try {
    
      const resu = await axios.post(`${uri}/newhorario`,{condi,legajo,fecha,hora})
      //console.log(resu)

    } catch (error) {
    
      console.log(error)
    }
    

  }


  //calcular horas entre entrada salida
  const calcularHoras=(hentrada,hsalida)=>{
    let horaE =parseFloat(hentrada.substr(0,2))
    let minE=parseFloat(hentrada.substr(3,2))
    let horaS =parseFloat(hsalida.substr(0,2))
    let minS=parseFloat(hsalida.substr(3,2))
    let horaT=0
    let minT=0
    if (minE > minS){
      minT=minS + 60 - minE
      horaT = horaS - horaE -1
    }else{
      minT=minS - minE
      horaT = horaS - horaE 
    }
    
    let cantiH  = horaT  + minT/60    
    //setHorasT(cantiH)
    return cantiH
   
     
    
  }

  //verificar si es entrada nueva, nueva entrada o salida
  const VerificarFecha=async ()=>{
    
    const retorno = await getAsistencia()
    
    try{
    
    if (retorno.length===0){
      return 0
    }
    else{
      
      let nroregs = retorno.length
      if(retorno[nroregs-1].Hsalida ==='X'){
        
        
        return retorno[nroregs-1].Hentrada + "," +retorno[nroregs-1].nroregistro
      
      }else{
      
        return 1
      
      }
    }
  }catch(error){
    console.log(error)
    return 2
  }
  }
    
     
  //tomar la accion de grabar entrada o salida
    
  const setHoraIO = async (e) =>{
    e.preventDefault()
   let tipo = await VerificarFecha()
   if(tipo!==2){
    //console.log(tipo)
   if (tipo===0){
    grabarNuevoRegistro(legajo,condi,fecha,hora)
   Swal.fire({
      icon: 'success',
      title: 'Registro de Entrada',
      text: `fecha:${fecha} - hora:${hora}`
      
    })
   }else if(tipo===1){
    Swal.fire({
      title: 'Seguro que quiere marcar Nuevo Ingreso en el dia de Hoy?',
      text: `fecha:${fecha} - hora:${hora}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#f33',
      confirmButtonText: 'Registrar?'
    }).then((result) => {
      if (result.isConfirmed) {
     grabarNuevoRegistro(legajo,condi,fecha,hora)
        Swal.fire({
          title:'Ingreso Registrado',
          icon:'success',
          
          
      })
      }
    })
   }else{
   
    let valores=tipo.split(',')
    let nreg=valores[1]
    let horaE=valores[0]
    let horaminu= calcularHoras(horaE,hora)
   
   grabarSalida(legajo,condi,hora,nreg,horaminu)
    
   Swal.fire({
      icon: 'success',
      title: 'Registro de Salida',
      text: `fecha:${fecha} - hora:${hora}`
    })
   }
  }else{
    Swal.fire({
      icon: 'success',
      title: 'Error',
      //text: `fecha:${fecha} - hora:${hora}`
    })
  }
   navigate('/asistencia')
    
  }

  return (
  
  
  <div className='container-fluid'>

    <div className='row'>
              
              <div className='col md-2 xs-12'>

              </div>
              
              <div className='col md-8 xs-12'>
            
                <div className='card'>
                  <div className='card-header'>
                    <h4>Registro Asistencia Virtual</h4>
                </div>
                    <div className='car-body m-2 p-2'>
              
                        
                        <h6>Fecha: {fecha}</h6>
                        <h6>Hora:  {hora}</h6>
                        <h5>Legajo: {legajo}</h5>
                        <h5>Nombre: {nombre}</h5>
                        
                    </div>
                   
                    <div className='card-footer m-2'>
                        <h4>El Horario Registrado, Sin asistencia a la Facultad solo queda Acrediatado por Su superior</h4> 
                       
                        <br/><button onClick={setHoraIO} className='btn btn-primary'>Registrar Asistencia</button>
                    </div>
            
                </div>
              </div>
            
                <div className='col md-2 xs-12'>

                </div>
          </div>
        </div>    
    
  )
}

export default AsistenciaVirtualPage
