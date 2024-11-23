import './styles/user.css'
import {useEffect, useState} from 'react'
import { fetchCart } from '../context/cartContext';
import { useAuthContext } from '../hooks/Auth/useAuthContext';

function UserCard({user:userData}) {
    const [Loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart]=useState(null)
    const {user}=useAuthContext()
    const {email,username}=userData;
    const handleDelete=async()=>
        {
            setDeleted(null)
                return
            //   //api request to delete the product
            // const response = await fetch('/api/products/'+,{
            //     method:'DELETE',
            //     headers:{
            //         'authorization':`Bearer`
            //     }
            // }) 
            // const json=await response.json()||null
    
            //  if(response.ok)
            //  {
            //     setDeleted(true)
            //     productdispatch({type:'DELETE_PRODUCT',payload:json})
            //  }
            //  else
            //     setDeleted(false)
        };

    useEffect(() => {
        try {
            const User={email,token:user.token}
            fetchCart(User,setError,setLoading,setCart)
        } catch (error) {
            console.log('error fetching cart in users',error)
        }
    }, [])


    return(
        <div className="user w-full">
            <h3 className="name">{username}</h3>
            <p className="email">{email}</p>
            <button className="delete-button" onClick={() => 
            {if (window.confirm(`Are you sure you want to delete "" ?`)) {handleDelete();} }}>
                Delete User
            </button>
            
            <div className="carting">
                <h1 className="cart-name col-span-2">
                        Cart
                </h1>
                <p className="qty font-bold">Items</p>
                <p className="price font-bold">Price</p>
                <p className="qty">{cart?.total_qty}</p>
                <p className="price">${cart?.total_price}</p>
            </div>
        </div>
    )
}
export default UserCard