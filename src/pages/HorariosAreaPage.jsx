import React,{useState, useEffect, useContext} from 'react'
import axios from 'axios'

import ReactDatePicker, { registerLocale } from 'react-datepicker'
//import HorariosAreaVista from '../components/ViewHorarios'

import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es'
import AuthContext from '../contexts/AuthContext'
import '../css/HorariosPageArea.css'
import { authAreas } from '../utils/dataroles';
import { CSVLink } from 'react-csv';
import Swal from 'sweetalert2';
import { URI_BIO } from '../utils/constants';



registerLocale("es", es)

//const uri = 'http://200.12.136.74:4000/biometrico/'
const uri = URI_BIO




const HorariosAreaPage = () => {

  const {legajo,area,supArea} = useContext(AuthContext)  
  
  const [asistencia_area, setAsistencia_area] = useState([])
  const [habilitado, setHabilitado ] = useState(false)
  const [fechai,setFechai]=useState(new Date())
  const [fechaf,setFechaf]=useState(new Date())
  const [areasAuth, setAreasAuth] = useState([])
 
  
  const [ruta, setRuta] = useState(`${uri}`)
 
  const traertipo=(modalidad)=>{
  if(modalidad === 'V'){
    return 'V'
  }else if(modalidad === 'A'){
    return 'A'
  }else{
    return 'P'
  }
}



 

  useEffect(()=>{
    
   if(supArea==='S' || supArea==='A' || supArea==='T'){
       setHabilitado(true)
        
        if(supArea==='A'){
        
          try {
            const areasAt =authAreas.find(area=>area.legajo===legajo)
          //console.log(areasAt.area)
            setAreasAuth(areasAt.areas)
          //console.log(authAreas)
            } catch (error) {
              console.log(error)
           }
          } 
          
        }else{

              Swal.fire({
                  icon: 'error',
                  title: 'Acceso a Areas No permitido..',
                  text: 'No tiene permiso para acceder a esta info',
                  
                })

        }
    
  

 
  },[legajo,supArea])
  
  useEffect(() => {


     const getAsistencia_area = async  () => {
      try{
  
        const res = await axios.get(ruta)
        await setAsistencia_area(res.data)
        
    }catch(error){
        console.log(error)
    }
    }
    

    if(ruta !== URI_BIO){
    getAsistencia_area()
    }
    
  }, [ruta])

 

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

  //
  const updatehorario =async(legajo, nroregistro)=>{
    
    try {
      const resuup = await axios.put(`${uri}/acreditarhoras/${legajo}/${nroregistro}`)
      
      if (resuup.statusText === 'OK'){
        const res = await axios.get(ruta)
        await setAsistencia_area(res.data)
           Swal.fire({
            title:'Horario Acreditado',
            icon:'success',
          })
        }
    } catch (error) {
      console.log(error)
    }

  }

  //preparar ruta de busqueda
  const buscarAsistencia = async ()=>{
    var ff = ''
    var fi =''
    try{
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
    let areaCombo = document.getElementById('area').value
 
    if (supArea==='T'){
        let url = `${uri}/horas_area_fecha/${areaCombo}/${fi}/${ff}`
        setRuta(url)
      }else {

        if (supArea==='A'){
          //console.log(areasAuth)
          if (areasAuth.find(area=>area === areaCombo)){
            let url = `${uri}horas_area_fecha/${areaCombo}/${fi}/${ff}`
            console.log(url) 
            setRuta(url)
          } else{
            Swal.fire({
              icon: 'info',
              title: 'Acceso a Area No Autorizado ',
              text: 'Sin Permiso para acceder a la info de esta Area',
              
            })
          }
        //console.log(areaCombo)
        }else
          //console.log(areaCombo,area,supArea)
          if (areaCombo===area && supArea==='S'){
        
              let url = `${uri}/horas_area_fecha/${areaCombo}/${fi}/${ff}`
              setRuta(url)
        }else{
          Swal.fire({
            icon: 'info',
            title: 'Acceso a Area No Autorizado ',
            text: 'Sin Permiso para acceder a la info de esta Area',
            
          })
        }
  }
  }catch(error){
    console.log(error)
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


  //acreditar horas virtuales trabajadas
  const acreditarHoras = (legajo, nroregistro, fecha,apellido)=>{
    Swal.fire({
      title: 'Acredita Horas No Presenciales?',
      text: `Persona:${apellido} - fecha:${fecha}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#f33',
      confirmButtonText: 'Confirmar?'
    }).then((result) => {
      if (result.isConfirmed) {
        
        updatehorario(legajo,nroregistro)
        
      
      }
    })
    
  }

  return (
    <div>
    
    {habilitado &&
    <div className='row m-2'>
          
      <div className='col-md-4 sm-4 xs-12'>
      
      <div className="row row-tit" >
         
      </div>
      
     
       
      <div className="card shadow">
      <div className="card-title text-left border-bottom">
                <h4 className='p-3'> Control Por Area  </h4>
            </div> 
         <div className="card-body m-2">

          <div>
          
          <label htmlFor="area"> Area </label>
          <select id='area' className='select' style={{width:'350px',height:'40px'}}>
            <option>SELECCIONE UN AREA</option>
            <option value="Docentes">Claustro Docentes</option>
            <option value ="Coordinación_de_Prácticas_Socioeducativas">Coordinación de Prácticas Socioeducativas</option>
            <option value="Carrera_Licenciatura_en_Administración">Carrera Licenciatura en  Administracion</option>
            <option value="Carrera_Licenciatura_en_Economía">Carrera Licenciatura en Economia</option>
            <option value="Carrera_Contador_Público">Carrera Contador Público</option>
            <option value="Carrera_Licenciatura_en_Logística">Carrera Licenciatura en Logística</option>            
            <option value="Decanato">Decanato</option>
            <option value="Departamento_Clases_y_Exámenes">Departamento Clases y Exámenes</option>
            <option value="Departamento_Mesa_de_Entradas">Departamento Mesa de Entradas</option>
            <option value="Dirección_de_Alumnos">Direccion de Alumnos</option>
            <option value="Dirección_de_RRHH">Dirección de RRHH</option>   
            <option value="Dirección_de_Servicios_Generales">Dirección de Servicios Generales</option>         
            <option value="Dirección_de_Informática">Dirección de Informática</option>
            <option value="Dirección_de_Biblioteca">Dirección de Biblioteca</option>
            <option value="Dirección_de_Despacho">Dirección de Despacho</option>
            <option value="Dirección_de_Publicaciones">Dirección de Publicaciones</option>
            <option value="Dirección_General_de_Gestión_Administrativo_Financiera">Dirección General de Gestión Administrativo Financiera</option>
            <option value="Dirección_General_de_Gestión_Académica">Dirección General de Gestión Académica</option>
            <option value="ECONET">ECONET</option>
            <option value="Secretaría_de_Administración_y_Finanzas">Secretaría de Administración y Finanzas</option>
            <option value="Secretaria_de_Bienestar">Secretaria de Bienestar</option>
            <option value="Secretaría_de_Extensión_y_RRII">Secretaría de Extensión y RRII</option>
            <option value="Secretaría_de_Posgrado_e_Investigación">Secretaría de Posgrado e Investigación</option>
          
            
          </select>
          </div>


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
          
          {asistencia_area.length > 0 ? 
        <button className='btn btn-outline'>
        <CSVLink data={asistencia_area} filename={`asistencia_${legajo}_ ${new Date().toLocaleString()}.csv`}>Exportar a .csv</CSVLink>
        </button>
        :null}
       </div>
       </div>

       </div>
      </div>
      <div className='col-md-8 sm-8 xs-12 '>
          {asistencia_area.length > 0 ?  <div className='container tbl-container'>
        <div className="row tbl-fixed">
      <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Legajo</th> 
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Modalidad</th>
              <th>Acreditar</th>
            </tr>
          </thead>
      
          <tbody>
             {
              asistencia_area.map((ele,ind)=>
                <tr key={ind}>
                  
                  <td>{ele.legajo}</td>
                  <td>{ele.apellido}</td>  
                  <td>{ele.fecha}</td> 
                  <td>{ele.Hentrada}</td> 
                  <td>{ele.Hsalida}</td>
                  <td>{traertipo(ele.virtual)}</td>
                  <td>{ele.virtual==='V'?(
                    <button 
                    className='btn btn-primary'
                    onClick={()=>acreditarHoras(ele.legajo,ele.nroregistro,ele.fecha,ele.apellido)}
                    >
                      Acreditar
                    </button>
                  ):null}</td>
                </tr>
              )
              }
          </tbody>
      </table>
      </div>
    </div>: <div className='container'>
              <h4> Sin Registros Fecha seleccionada</h4>
            </div>
      } 
      </div>
    </div>
}
   
  </div>
  )
}
 
  

export default HorariosAreaPage
