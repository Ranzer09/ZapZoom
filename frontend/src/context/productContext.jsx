import {createContext, useReducer} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect } from 'react'
export const ProductContext=createContext()

const BASE_URL = import.meta.env.VITE_API_URL || '/api';
export const ProductReducer=(state,action)=>{
    switch(action.type){
        case 'SET_PRODUCT':
            return{products:action.payload}
        case 'CREATE_PRODUCT':
            return{products:[action.payload,...state.products]}
        case 'DELETE_PRODUCT':
            return{products:state.products.filter(p=>p._id!== action.payload._id)}
        case 'UPDATE_PRODUCT':{
            let product=state.products.find(p => p._id.toString() === action.payload._id);
            return{
                products:[...state.products,{...product,qty:action.payload.qty,
                    price:action.payload.price,name:action.payload.name}]
            }
        }
        default:
            return state
    }
}

export const ProductContextProvider =({children})=>{

    const [state,dispatch] =useReducer(ProductReducer,{
        products:[]
    })
    const { user,loading } = useAuthContext();
        
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(BASE_URL+'/api/products', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                const json = await response.json();
                console.log(json);
                if (response.ok) {
                    dispatch({ type: 'SET_PRODUCT', payload: json });
                } else {
                    console.error('Failed to fetch products:', json);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
    
        if(user!==null)
            fetchProducts();
    }, [dispatch, user]);
    return(
        <ProductContext.Provider value={{...state,dispatch}} >
            {children}
        </ProductContext.Provider>
    )
}
