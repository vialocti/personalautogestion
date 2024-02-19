import React,{createContext, useState, useCallback, useMemo} from "react"
import { autenticarse } from '../services/ServiceConsu'
//import Cookies from "universal-cookie"

const MY_AUTH_APP = false
const MY_AUTH_LEGAJO = 9
const MY_AUTH_CONDICION = 2
const MY_AUTH_NOMBRE = null
const MY_AUTH_NRODOC = null
const MY_AUTH_AREA = ''
const MY_AUTH_S_AREA='N'
const AuthContext = createContext()


//const cookies = new Cookies()
const AuthProvider =({children})=>{
    
    
    const [legajo, setLegajo]=useState(localStorage.getItem(MY_AUTH_LEGAJO))
    const [isLoged, setIsLoged] =useState(localStorage.getItem(MY_AUTH_APP))
    const [nombre, setNombre] = useState(localStorage.getItem(MY_AUTH_NOMBRE))
    const [nrodoc,setNrodoc] = useState(localStorage.getItem(MY_AUTH_NRODOC))
    const [condi, setCondicion] = useState(localStorage.getItem(MY_AUTH_CONDICION))
    const [area, setArea] = useState(localStorage.getItem(MY_AUTH_AREA)) 
    const [supArea, setSupArea] = useState(localStorage.getItem(MY_AUTH_S_AREA))
    
    
    const login = useCallback (async(leg,passw)=>{
        //setPassword=(passw.toString()) 
        //console.log(passw)
        const data = await autenticarse(leg,passw)  
        if (data !== 1){
        if (data[0].existe === 0){
           
            setIsLoged(false)  
            return 0
        }else{
            localStorage.setItem(MY_AUTH_APP,true)
            localStorage.setItem(MY_AUTH_LEGAJO,data[0].legajo)
            localStorage.setItem(MY_AUTH_CONDICION,data[0].condicion)
            localStorage.setItem(MY_AUTH_NRODOC,data[0].nrodocumento)
            localStorage.setItem(MY_AUTH_NOMBRE,data[0].apellido)
          //  localStorage.setItem(MY_AUTH_PASSW,password)
          localStorage.setItem(MY_AUTH_AREA,data[0].area)
          localStorage.setItem(MY_AUTH_S_AREA,data[0].encargado_area)
            setIsLoged(true)
            setNombre(data[0].apellido)
            setCondicion(data[0].condicion)
            setNrodoc(data[0].nrodocumento) 
            setLegajo(data[0].legajo)  
            setArea(data[0].area)
            setSupArea(data[0].encargado_area) 
            
                   
        }  
    }else{
        setIsLoged(false)  
            return 10
    }      
      
    },[])

    const logout =useCallback(()=>{
        localStorage.removeItem(MY_AUTH_APP)
        localStorage.removeItem(MY_AUTH_NOMBRE)
        localStorage.removeItem(MY_AUTH_NRODOC)
        localStorage.removeItem(MY_AUTH_LEGAJO)
        localStorage.removeItem(MY_AUTH_CONDICION)
        localStorage.removeItem(MY_AUTH_AREA)
        localStorage.removeItem(MY_AUTH_S_AREA)
        //localStorage.removeItem(MY_AUTH_PASSW)
        setLegajo(9)
        setNrodoc('')
        //setPassword('')
        setNombre('')
        setCondicion(2)
        setIsLoged(false)   
        setArea('')
        setSupArea('N')
    },[])

    
    const data = useMemo(
        ()=>({
            login,
            logout,
            legajo,
            isLoged,
            nombre,
            nrodoc,
            condi,
            area,
            supArea
        }),[login,logout,isLoged,condi,legajo,nombre,nrodoc,area,supArea]
    )

    
    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthProvider}
export default AuthContext