import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'

import ReactDatePicker, { registerLocale } from 'react-datepicker'
import ViewHorarios from '../components/ViewHorarios'

import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es'
import AuthContext from '../contexts/AuthContext'
import '../css/HorariosPage.css'
import { CSVLink } from 'react-csv';
import Swal from 'sweetalert2';
import { personaDiasInsistencia } from '../services/ServiceConsu';
import { URI_BIO } from '../utils/constants';



registerLocale("es", es)

//const uri = 'http://200.12.136.74:4000/biometrico/'
const uri = URI_BIO




const HorariosPage = () => {
  const {legajo,condi} = useContext(AuthContext)  
  
  const [asistencia, setAsistencia] = useState([])
  const [inasistencia, setInasistencia] = useState([])
  //const [inasisanio, setInasisanio]=useState([])
  
  const [fechai,setFechai]=useState(new Date())
  const [fechaf,setFechaf]=useState(new Date())
  
  const [diasREX, setDiasREX]=useState([])
    //const [horasT, setHorasT] =useState('')
 // const [diasT, setDiasT] = useState('')

  const [ruta, setRuta] = useState(`${uri}/horario_persofechas/28367/9/2122-09-01/2122-09-23`)
  const [rutaI, setRutaI] = useState(`${uri}/inasistenciasF/28367/2122-09-01/2122-09-23`)
  
  
  //const [rutaD, setRutaD] = useState(`${uri}diasregistrados/28367/2122-09-01/2122-09-23`)

  
  
  
  
  useEffect(()=>{
    

    
    const getfechas=()=>

    
    {
      let ff = new Date()
      let diaC = ff.getDate()
      let mes=''
      let dia=''
      let fechaf=''
      let fechai=''
      // console.log(diaC)
      if (diaC > 1){
            dia = ff.getDate()-1 < 10 ? '0' + (ff.getDate()-1).toString() : (ff.getDate()-1).toString()
            mes = ff.getMonth()+1<10 ? '0'+ (ff.getMonth()+1).toString() : (ff.getMonth()+1).toString()
            fechaf = ff.getFullYear() + '-' + mes + '-' + dia
            fechai = ff.getFullYear() + '-' + mes + '-01'
            
      }else{

          if (ff.getMonth===0){
            fechaf = ff.getFullYear()-1 + '-12-31'
            fechai = ff.getFullYear()-1 + '-12-01'

          }else{
              mes =ff.getMonth()-1
        
              if (mes === 0 || mes === 2 || mes === 4 || mes ===6 || mes === 7  || mes === 9 ){
                dia=31
              }else{
                dia=30
                console.log(mes)
              }
              let mesf = mes + 1
              fechaf = ff.getFullYear()+'-' + mesf +'-'+ dia
              fechai = ff.getFullYear() + '-' + mesf + '-01'
          }  
      }
        
      
    //console.log(fechaf, fechai)
      
      if( Number.isInteger(legajo) && legajo!==9){
        setRuta(`${uri}/horario_persofechas/${condi}/${legajo}/${fechai}/${fechaf}`)
      
        setRutaI(`${uri}/inasistenciasF/${legajo}/${fechai}/${fechaf}`)
        
         //console.log(rutaI,ruta)
      }
     }


    getfechas()
   
  },[legajo,condi])
  
  
  
  useEffect(() => {

     
   
    const getAsistencia = async  () => {
      try{
  
        const res = await axios.get(ruta)
        await setAsistencia(res.data)
        
       
    }catch(error){
        console.log(error)
    }
    }
    
  

    if( Number.isInteger(legajo) && legajo!==9){
    getAsistencia()
    //getInasistencias()
      //getHoras()
    }
  
  }, [ruta,legajo])

  


  useEffect(() => {
  
    
  
      
    const getInasistencias = async  () => {
      try{
        
        const res = await axios.get(rutaI)
        await setInasistencia(res.data)
        
       
    }catch(error){
        console.log(error)
    }
    }
  
    const getInasisPer = async  () => {
      try{
        
        const resp= await personaDiasInsistencia(legajo)
        setDiasREX(resp.split(';'))
    }catch(error){
        console.log(error)
    }
    }
    
    
    

    if( Number.isInteger(legajo) && legajo!==9){
        getInasistencias()
        getInasisPer()
      
    }
  
  }, [rutaI,legajo])

  

  //
 

  //funcion de conversion de fecha para consulta
   

  const convertirfecha = (fecha)=>{
      
  let dia=fecha.getDate()
  let mes = fecha.getMonth() +1
  let anio = fecha.getFullYear()
  if (dia < 10){
    dia = '0' + dia
  }
  if (mes<10){
    mes = '0' + mes
  }

  return anio + '-' + mes + '-' + dia

}



  //preparar ruta de busqueda
  const buscarAsistencia = async ()=>{
    var ff = ''
    var fi =''
    
    if (fechaf-fechai < 0){
      Swal.fire({
        icon: 'error',
        title: 'Error de Fechas...',
        text: 'Fecha Inicial debe ser menor a la Fecha Final',
        
      })
    }else{
      ff = convertirfecha(fechaf)
      fi = convertirfecha(fechai)
    }
    
    
    
    let url = `${uri}/horario_persofechas/${condi}/${legajo}/${fi}/${ff}`
    let urli= `${uri}/inasistenciasF/${legajo}/${fi}/${ff}`
    //let urld= `${uri}diasregistrados/${condi}/${legajo}/${fi}/${ff}`
    // console.log(legajo)
    if( Number.isInteger(legajo) && legajo!==9 ){
        setRuta(url)
        setRutaI(urli)
        //setRutaD(urld)
    }
   
   
}  

//actualizar fechas inicio y final
const onChangeFi = (fecha)=>{
    setFechai(fecha) 
    setFechaf(fecha)
}

const onChangeFf = (fecha)=>{
  setFechaf(fecha)

}

  
  return (
    <div className='container'>
     <div className="row" style={{background:'#aabbbb'}}>
      <div className='col-xs-12'>
        <h5>Dias tomados Por Estudio(max 24), por Razones Particulares(max 6) y por Permisos Excepcionales(max 5)</h5>
      </div>
     </div>

     <div className="row" style={{background:'#00aadd'}}>
        <div className="col-xs-12 col-md-4"><h6>Por Estudio:<strong>{diasREX[0]}</strong></h6></div>
        <div className="col-xs-12 col-md-4"><h6>Por Razones Particulares:<strong>{diasREX[1]}</strong></h6></div>
        <div className="col-xs-12 col-md-4"><h6>Por Permisos Excepcionales:<strong>{diasREX[2]}</strong></h6></div>
    </div>
    
    
    <div className='row'>
          
    <div className='col x-12 md-3'>
      
    <div className="row row-tit" >
         
         </div>
      
     
       
      <div className="card shadow">
      <div className="card-title text-left border-bottom">
                <h4 className='p-3'> Ingresar Período a Controlar  </h4>
            </div> 
         <div className="card-body">

          <div>
            <label className='label'htmlFor="fechainicial">Fecha Inicio</label>
                <ReactDatePicker 
                id='fechai' 
                selected={fechai}
                onChange={onChangeFi}
                locale="es" className="pickers" dateFormat='dd-MM-yyyy'
            />
          </div>
      
         <div style={{marginTop:'10px'}}>
            <label className='label' htmlFor="fechafinal">Fecha Fin</label>
            <ReactDatePicker 
              id='fechaf' 
              selected={fechaf}
              onChange={onChangeFf}
              locale="es" className="pickers" dateFormat='dd-MM-yyyy'
             />
          </div>
        </div>

       <div className="card-footer">
       <div className='rowp'>
          <button className='btn btn-primary' 
               onClick={buscarAsistencia}
                >Ver Asistencia
          </button>
          {asistencia.length > 0 ? 
        <button className='btn btn-outline'>
        <CSVLink data={asistencia} filename={`asistencia_${legajo}_ ${new Date().toLocaleString()}.csv`}>Exportar a .csv</CSVLink>
        </button>
        :null}
       </div>
       </div>

       </div>
      </div>
      
       <div className='col xs-12 md-9'>
          {asistencia.length > 0 ? <ViewHorarios datosasistencia={asistencia} datosinasistencia={inasistencia}/>: null} 
      </div>
    </div>
    
   
   
  </div>
  )
}
 
  

export default HorariosPage
