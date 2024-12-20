import { useNavigate } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext"
import {useEffect} from 'react'
import CartItem from "./cartItem"
import './styles/cart.css'
import { useAuthContext } from "../hooks/useAuthContext";

function Cart(){
    const {user}=useAuthContext()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
    },[user])
    const {cart,total_price,total_qty}=useCartContext()
    if (cart.length === 0) {
        return <div className="cart-empty">Cart is empty</div>;
    }
    
return(
    <div className="cart">
        <div className="cart-heading">
            <span>Item No.</span> 
            {/* <span>Item Image</span> */}
            <span className="">Name</span> 
            <span>Quantity</span> 
            <span className="cart-hide">Price</span> 
            <span className="">Subtotal</span> 
        </div>
        <div className="cart-item">
            {cart.map((elem,i)=>{
                
                return <CartItem key={elem._id} {...elem} index={i}/>
            })}
        </div>
        <div className="total">
        <p className=" ">
            Total Quantity: <span className="end">{total_qty} </span>
        </p>
        <p className="total-price">
            Total Price: <span className="end">₹{total_price}</span>
        </p>
            
        </div>
    </div>
)
}

export default Cart