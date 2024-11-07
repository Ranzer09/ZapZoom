import cartIcon from '../assets/cart.png'
import {useState,useEffect} from 'react'
import './styles/miniCart.css'
import { useCartContext } from '../hooks/useCartContext'
import { useAuthContext } from '../hooks/useAuthContext'

function Minicart(){
    const {cart,total_price,total_qty}=useCartContext()
    const {user}=useAuthContext()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    let cost = 0
    let number = 0
    if(total_price&&total_qty)
    {
    cost =total_price
    number = total_qty
    }
    return(
        <span className="cart grid place-content-center">
            <div className="carter">
                <img src={cartIcon} alt="Cart" className="cart-image"/>
                <span className="cart-count">{number}</span>
            </div>
            <div className="bottom">${cost}</div>
        </span>
    )
}
export default Minicart