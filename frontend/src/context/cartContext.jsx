import {createContext, useEffect, useReducer, useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';
export const CartContext=createContext()

export const CartReducer=(state,action)=>{
    switch (action.type) {
        case 'SET_CART': {
            return {
                ...state,
                cart: action.payload.cart,
                total_price: action.payload.total_price,
                total_qty: action.payload.total_qty,
            };
        }
        case 'ADD_TO_CART': {
            const { qty, price } = action.payload;
            const updatedCart = [...state.cart, action.payload];
            return {
                ...state,
                cart: updatedCart,
                total_price: state.total_price + qty * price,
                total_qty: state.total_qty + qty,
            };
        }
        case 'UPDATE_PRODUCT': {
            let productIndex = state.cart.findIndex(p => p._id.toString() === action.payload.id);
            if (productIndex === -1) return state;
        
            const { qty, price } = action.payload;
        
            // Create a new product object based on the existing one
            const updatedProduct = {
                ...state.cart[productIndex],
                qty,
                price,
            };
        
            // Create a new cart array with the updated product
            const updatedCart = [
                ...state.cart.slice(0, productIndex), // products before the updated one
                updatedProduct, // the updated product
                ...state.cart.slice(productIndex + 1), // products after the updated one
            ];
        
            return {
                ...state,
                cart: updatedCart,
                total_price: state.total_price + (qty * price) - (state.cart[productIndex].qty * state.cart[productIndex].price),
                total_qty: state.total_qty + (qty - state.cart[productIndex].qty),
            };
        }
        case 'REMOVE_PRODUCT':
            {
                const {_id,qty,price}=action.payload;
                const updatedCart =state.cart.filter(p=>p._id!==_id)
                console.log(updatedCart,state.total_price - qty * price, state.total_qty - qty,)
                return {
                    ...state,
                    cart: updatedCart,
                    total_price: state.total_price - qty * price,
                    total_qty: state.total_qty - qty,
                };
        }
        
        case 'CLEAR_CART':{
            return{
                ...state,cart: [],
                total_qty: 0,
                total_price: 0,
            }
        }
        default:
            return state;
    }
};

export const CartContextProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    const initial_state = {
        cart: [],
        total_qty: 0,
        total_price: 0,
    };

    const [state, dispatch] = useReducer(CartReducer, initial_state);
    let total_qty=state.total_qty
    useEffect(() => {
        const fetchCart = async () => {
            if (!user) return;
            const email = user.email;
            console.log(user.token)
            try {
                const response = await fetch(BASE_URL+'/api/cart/' + email, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${user.token}` },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
               
                dispatch({ type: 'SET_CART', payload: data });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [user,total_qty]); // Fetch cart when user changes
    return(
        <CartContext.Provider value={{...state,dispatch,loading,error}} >
            {children}
        </CartContext.Provider>
    )
}
