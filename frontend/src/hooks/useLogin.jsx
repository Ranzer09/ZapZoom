import {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom";

export const useLogin=()=>{
    const navigate = useNavigate();
    const[Error,setError]=useState(null)
    const[Loading,setLoading]=useState(null)
    const {dispatch} = useAuthContext()

    //post request function
    const login=async (email,password) => {
        setLoading(true)    //initially it is loading
        setError(null)      //reset the error property to be false in the start

        //send post request to create user
        const response=await fetch('/api/user/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const json=await response.json()

        //if there is error, set it
        if(!response.ok)
        {
            setLoading(false)
            setError(json.error)
            console.log(json.error)
        }

        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user',JSON.stringify(json))
            //update auth context
            await dispatch({type:'LOGIN',payload:json})
            setLoading(false)
            navigate('/Api/products')
            console.log('good')
        }
    }
    return{login,Loading,Error}
}
