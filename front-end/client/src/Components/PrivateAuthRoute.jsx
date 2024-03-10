import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context'
import { loginCheck } from '../utils/logincheck'

const PrivateAuthRoute = ({children}) => {

    const navigate = useNavigate()
    const {login,setLogin} = useContext(AppContext)
    useEffect(()=>{
        if(!login){
            navigate("/Signup")
        }
    },[])

    return (
        <div>{children}</div>
    )
}

export default PrivateAuthRoute