import React, { useState,useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
export const AppContext=createContext()

const AppProvider=({children})=>{
    const [users,setUsers]=useState([]);
    const[value,setValue] =useState("https://s54-travel-advisory2.onrender.com/Travel");
    useEffect(()=>{
       axios.get('')
       .then(res=>setUsers(res.data))
    },[])

    return(
        <AppContext.Provider value={{setUsers,users,value,setValue}}>
          {children}
        </AppContext.Provider>
    )
}

export default AppProvider