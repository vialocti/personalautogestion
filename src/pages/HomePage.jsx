import React from 'react'
//import '../css/home.css'

const HomePage = () => {
  return (
    <div className='container fluid'>
        <div className="row p-4">
          <h3 className='h2 text-center'>Gestión Asistencia - Personal FCE</h3>
        </div>
        
        <div className="row">

          < div className="col-md-4 col-sm-4 col-xs-12 ">
            
                
                
                    <ul className="list-group">
                      <li className="list-group-item"> Control de Asistencia Personal </li>
                      <li className="list-group-item"> Mostrar sus Registros de Asistencia </li>
                      <li className="list-group-item"> Mostrar Horas Totales y Promedio en un periodo dado</li>
                      <li className="list-group-item"> Pudiendo Corroborar que Sean los Correctos </li>
                      <li className="list-group-item"> Verificar Asistencias por Areas de Responsabilidad </li>
                      <li className="list-group-item"> Registrar Asistencia Modalidad Virtual </li>
                      <li className="list-group-item"> Verificar y Acreditar Registros Virtuales </li>
                    </ul>
                
            

          </div>
          
          <div className="col-md-8 col-sm-8 col-xs-12 ">
         
               
                    <ul className="list-group">
                      <li className="list-group-item">Debe autenticar su identidad a traves de la opcion login: el password por defecto es el nrodocumento</li>
                      <li className="list-group-item">Si los datos son correctos el sistema lo redirigira a la opcion Asistencia Personal</li>
                      <li className="list-group-item">Por defecto muestra la asistencia del mes en curso hasta el dia anterior a su ingreso al sistema, excepto el 1 de cada mes, en ese caso, mostrará el mes anterior completo</li>
                      <li className="list-group-item">Del lado izquierdo se muestra un cuadro, en el cual puede elegir el periodo que desea verificar  </li>
                      <li className="list-group-item">Del lado derecho se mostrara la asistencia en el periodo seleccionado tal como le aparece cuando ingreso</li>
                      <li className="list-group-item">Puede exportar la información de asistencia a formato .csv</li>
                    </ul>
               
          </div>

        </div>
    </div>
  )
}

export default HomePage