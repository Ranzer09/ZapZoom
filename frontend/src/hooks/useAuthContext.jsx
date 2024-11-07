import { AuthContext} from "../context/usercontext";
import {useContext} from 'react'

export const useAuthContext=()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw Error('Authcontext must be used inside an AuthContextProvider')
    }
    return context
}