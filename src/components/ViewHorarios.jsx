import React,{useEffect, useState} from 'react'
import '../css/viewhorarios.css'

const ViewHorarios = ({datosasistencia,datosinasistencia}) => {
 
  const [promedio, setPromedio]=useState('')
  const [horasT, setHorasT] = useState('')
  const [diasT, setDiasT] = useState('')
  
 const traertipo=(modalidad)=>{
  //console.log(modalidad)
      if(modalidad === 'V'){
        return 'Virt.No Acreditado'
      }else if(modalidad === 'A'){
        return 'Virt.Acreditado'
      }else{
        return 'Presencial'
      }
 }

  const buscarmotivo =(mot)=>{
    if(mot==='04'){
      return 'Razon Particular'
    }else if(mot==='02'){
      return 'Estudio'
    }else if(mot==='32'){
      return 'Permiso Excepcional'
    } else if(mot==='05'){
      return 'Enfermedad Prolongada'
    } else if(mot==='06'){
      return 'Enfermedad'
    } else if(mot==='10'){
      return 'Familiar Enfermo'
    }
  }



  useEffect(() => {
  
    const getPromedio=()=>{
      
      let asistenciasconfi = datosasistencia.filter((asistencia) => asistencia.virtual !== 'V')
     
      
      let sumaH =asistenciasconfi.reduce((sum, value) => (typeof value.horasT == "number" ? sum + value.horasT : sum), 0)
      if(sumaH!==0){
      let fechaant=asistenciasconfi[0].fecha
      let dias=1 
      asistenciasconfi.map((ele)=> {
        if(fechaant !== ele.fecha){fechaant=ele.fecha; dias= dias + 1}
        return true
      })
    

      /*
      let sumaH =datosasistencia.reduce((sum, value) => (typeof value.horasT == "number" ? sum + value.horasT : sum), 0)
      let fechaant=datosasistencia[0].fecha
      let dias=1 
      datosasistencia.map((ele)=> {
        if(fechaant !== ele.fecha){fechaant=ele.fecha; dias= dias + 1}
        return true
      })
      */
      setDiasT(dias)
      setHorasT(sumaH.toFixed(2))
      let horas = Math.floor(parseFloat(sumaH)/parseFloat(dias))
      let minutos = Math.round(((parseFloat(sumaH)/parseFloat(dias)) - horas)*60, 2)
      
      if (minutos > 59){ 
        
        horas = horas + 1 
        minutos = 0 
      
      }
      setPromedio(`${horas} horas con ${minutos} minutos`)
      }else{ 
        setDiasT(0)
        setHorasT(0)
      }
    }

    const mostrarPromedio =()=>{
      if (diasT > 0 && horasT>0){
      let horas = Math.floor(parseFloat(horasT)/parseFloat(diasT))
      let minutos = Math.round(((parseFloat(horasT)/parseFloat(diasT)) - horas)*60, 2)
      if (minutos > 59){ 
        
        horas = horas + 1 
        minutos = 0 
      
      }
      setPromedio(`${horas} horas con ${minutos} minutos`)
      }else{ setPromedio(`0 horas con 0 minutos`)}
    }

    getPromedio()
    mostrarPromedio()
     //console.log(datosinasistencia)
  }, [datosasistencia,datosinasistencia,horasT,diasT])
  

  


  return (
    
    
      <div className='container tbl-container'>
        <div className="row tbl-fixed">
      <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Modalidad</th>
            </tr>
          </thead>
      
          <tbody>
             {
              datosasistencia.map((ele,ind)=>
                <tr key={ind}>
          
                  <td>{ele.fecha}</td> 
                  <td>{ele.Hentrada}</td> 
                  <td>{ele.Hsalida}</td>
                  <td>{traertipo(ele.virtual)}</td>
        
                </tr>
              )
              }
          </tbody>
      </table>
      </div>
       <div className="row">
        <div className='resu'>    
            Horas: {horasT} -- Dias: {diasT} -- Promedio: {promedio}
        </div>
        </div>

        
        <div className="row tbl-fixed">
        <table className="table table-sm">
          <thead>
            <tr style={{backgroundColor:'grey'}}>
              <th>Mot.Inasistencia</th>
              <th>Fecha Incio</th>
              <th>fecha Fin</th>
              
            </tr>
          </thead>
      
          <tbody>
             {
              datosinasistencia.map((ele,ind)=>
                <tr key={ind} style={{backgroundColor:'violet'}}>
                
                  <td>{buscarmotivo(ele.mot)}</td> 
                  <td>{ele.fechai}</td> 
                  <td>{ele.fechaf}</td>
        
                </tr>
              )
              }
          </tbody>
      </table>
      </div>

      </div>
      
      
  )
}

export default ViewHorarios