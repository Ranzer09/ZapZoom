import { CartContext } from "../context/cartContext";
import {useContext} from 'react'

export const useCartContext=()=>{
    const context=useContext(CartContext)

    if(!context)
        throw Error ('useCartContext must be used within scope of App element')

    return context
}