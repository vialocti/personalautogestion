

import axios from 'axios';
import { URI_BIO, URI_CAR } from '../utils/constants';

//const uri = "http://172.22.160.70:4000/biometrico";

const uric = URI_CAR;
const uri=URI_BIO



//autenticarse
export async function autenticarse(legajo, passw) {
    let datos={
        legajo,
        passw
    }
    let strq = `${uri}/login`

    try {
        const response = await axios.post(strq,datos)
         //console.log(response.data)
       return response.data



    } catch (error) {
        
        console.log(error)
    }
}


//cambiar pass
//
export async function changepassAgente(legajo, passwold, passnew) {
  
    let datos={
        legajo,
        passwold,
        passnew
    }
    let strq = `${uri}/changepass`

    try {
        const response = await axios.post(strq, datos)
        //console.log(response)
        return response



    } catch (error) {
        console.log(error)
    }
}

export async function resetpassAgente(legajo, documento) {
    
    let datos={
        legajo,
        documento
    }
    let strq = `${uri}/resetpass`
    try {
        const resu = await axios.post(strq, datos)
        return resu.data
    } catch (error) {
        console.log(error)
    }

}



//-------Asistencias Consultas ---------


//consulta asistencia por agente
export async function asistenciaPersona(claustro, fechaini, fechafin, legajo) {
    var fecfin = ''
    try {
        if (fechafin === '0000-00-00' || fechafin === '') {
            fecfin = fechaini
        } else {
            fecfin = fechafin
        }

        const response = await axios({
            url: uri + `/asistencia_p/${claustro}/${fechaini}/${fecfin}/${legajo}`,
            method: "GET"
        })

        if (response.data.length === 0) {
            console.log("NAda")
        }

        return response
    } catch (error) {
        console.log(error)

    }
}

//diasregistrados/0/28220/2022-09-05/2022-09-16

//consulta dias asisistencia por agente
export async function personaDiasAsistencia(claustro, fechaini, fechafin, legajo) {
    var fecfin = ''
    try {
        if (fechafin === '0000-00-00' || fechafin === '') {
            fecfin = fechaini
        } else {
            fecfin = fechafin
        }

        const response = await axios({
            url: uri + `/diasregistrados/${claustro}/${fechaini}/${fecfin}/${legajo}`,
            method: "GET"
        })

        if (response.data.length === 0) {
            console.log("NAda")
        }

        return response
    } catch (error) {
        console.log(error)

    }
}


//horastotal/0/28367/2022-09-05/2022-09-16

export async function personaHorasAsistencia(claustro, fechaini, fechafin, legajo) {
    var fecfin = ''
    try {
        if (fechafin === '0000-00-00' || fechafin === '') {
            fecfin = fechaini
        } else {
            fecfin = fechafin
        }

        const response = await axios({
            url: uri + `/horastotal/${claustro}/${fechaini}/${fecfin}/${legajo}`,
            method: "GET"
        })

        if (response.data.length === 0) {
            console.log("NAda")
        }

        return response
    } catch (error) {
        console.log(error)

    }
}

//biometrico/insasisteciasres/34909/2023-01-01/2023-07-01
//insaistencias por permisos estudio, razon particular y 102

const convertirina = (datos) => {

    let inae = []
    let inar = []
    let inax = []
    let tuto = ''
    inae = datos.find(ele => ele.mot === '02')
    inar = datos.find(ele => ele.mot === '04')
    inax = datos.find(ele => ele.mot === '32')

    if (inae) {

        tuto = `${inae.dias}`

    } else {
        tuto = '0'
    }
    if (inar) {

        tuto = tuto + `;${inar.dias}`

    } else {
        tuto = tuto + ';0'
    }
    if (inax) {

        tuto = tuto + `;${inax.dias}`

    } else {
        tuto = tuto + ';0'
    }

    return tuto
}



export async function personaDiasInsistencia(legajo) {


    let anio = new Date().getFullYear()
    //console.log(anio)
    let fecha_i = `${anio}-01-01`
    let fecha_f = `${anio}-12-31`

    try {


        const response = await axios({
            url: uri + `/insasisteciasres/${legajo}/${fecha_i}/${fecha_f}`,
            method: "GET"
        })

        if (response.data.length === 0) {
            //console.log("NAda")
        }

        return convertirina(response.data)
    } catch (error) {
        console.log(error)

    }
}



//datos para antiguedad y Formularios Vacaciones

//datos persona
export const traerDatosPersona = async (legajo) => {

    try {
        const resu = await axios.get(`${uric}/datosAgente/${legajo}`)
        //console.log(resu.data[0])
        return resu.data[0]
    } catch (error) {
        console.log(error)
    }
}


//antiguedad reconocida
export const traerDatosAntiguedadPersona = async (legajo) => {

    try {
        const resu = await axios.get(`${uric}/datosAntiguedadAgente/${legajo}`)
        //console.log(resu.data[0])
        return resu.data[0]
    } catch (error) {
        console.log(error)
    }
}

export const traerDatosParaVacaciones = async (legajo)=>{
    try {
        const resu = await axios.get(`${uric}/datosVaca/${legajo}`)
        //console.log(resu.data[0])
        return resu.data[0]
    } catch (error) {
        console.log(error)
    }

}
