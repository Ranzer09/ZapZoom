import { useNavigate } from "react-router-dom"
import { useAuthContext } from "./useAuthContext"
import { useCartContext } from "./useCartContext"

export const useLogout=()=>{
const{dispatch}=useAuthContext()
const {dispatch:cartDispatch}=useCartContext()
const navigate = useNavigate()

    const logout=()=>{
        //remove from local storage
        localStorage.removeItem('user')
        //remove cart context
        cartDispatch({type:'CLEAR_CART'})
        //dispatch logout action
        dispatch({type:'LOGOUT'})
        navigate('/')

    }
    return {logout}
}