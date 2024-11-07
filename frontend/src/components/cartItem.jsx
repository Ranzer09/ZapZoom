import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import { useProductContext } from "../hooks/useProduct";
import { addProductToCart } from "./productCard"
import { useState} from 'react'
import './styles/cart.css'

function CartItem({_id,name,qty:cart_qty,price,index}){
    const {dispatch:cartdispatch}=useCartContext()
    const {products}=useProductContext()
    const [req_quanity,setReq_Quantity]=useState(cart_qty)
    const {user,loading}=useAuthContext()    
  
    const handleAdd=()=>{
      const final_qty=req_quanity-cart_qty
      let total_qty
      let product_qty = products.find(obj => obj._id === _id).qty;
      
      if(req_quanity===cart_qty)
        return

      if(req_quanity<cart_qty){
        total_qty=product_qty-final_qty
      }
      else 
      {
        total_qty=product_qty-req_quanity+cart_qty
      }
      if(total_qty<1)
        return(window.alert('Product out of stock, try again later or decrease the quantity'))
        let Product={id:_id,
        name:name,price:price,qty:final_qty};
          console.log('Product information:',Product)
        cartdispatch({ type: 'UPDATE_PRODUCT', payload: Product });
        addProductToCart(user.email, Product,user)
        .then(cart => {console.log("Cart updated sucessfully",cart)
          // Second API call to update info
          return fetch(`/api/products/${_id}`,{
            method:'PATCH',
            body:JSON.stringify({...Product,qty:total_qty}),
            headers:{'Content-Type':'application/json','authorization':`Bearer ${user.token}`}
        });
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update data');
          }
          return response.json();
        })
        .then(updatedResponse => {
          console.log('Data updated successfully:', updatedResponse);
        }) 
        .catch(error => console.error('Error:', error));
      }
      

      
    const handleDelete=()=>{
    const confirmed = window.confirm("This action will delete this item, Are you sure?");
      if (confirmed) 
      {
        const total_qty = products.find(obj => obj._id === _id).qty+cart_qty;
        let Product={_id,
          name,price,cart_qty};
        fetch('/api/cart/' + user.email + '/product/' + _id, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${user.token}`
            }
        })
        .then(response => {
            if (!response.ok) {
              console.log(response)
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cart => {console.log("Cart updated sucessfully",cart)
          // Second API call to update info
          return fetch(`/api/products/${_id}`,{
            method:'PATCH',
            body:JSON.stringify({...Product,qty:total_qty}),
            headers:{'Content-Type':'application/json','authorization':`Bearer ${user.token}`}
        });
        })
        .then(data => {
            cartdispatch({ type: 'REMOVE_PRODUCT', payload: Product }); 
            console.log(data)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
      }
      else
      return
    }

    const handleIncrement=(Qty)=>{
        setReq_Quantity(req_quanity+Qty)
      }

    const handleDecrement=(Qty)=>{
      if(req_quanity===1||req_quanity===10)
      { 
        const confirmed = window.confirm("This action will delete this item, Are you sure?(min quantity is 1)");
        if (confirmed) 
          setReq_Quantity(req_quanity-Qty)  
        else 
          return
      }
      else if(!(req_quanity===0))
      setReq_Quantity(req_quanity-Qty)

    if(Qty===10&&req_quanity<10)
    {
      const confirmed = window.confirm("This action will delete this item, Are you sure?(min quantity is 1)");
      if (confirmed) 
        setReq_Quantity(0) 
      else
      return
    }
      
    }
      
    console.log(index,name,cart_qty,price)
    if (loading) {
        return <div>Loading...</div>; // Or your loading spinner
    }
    return(
        <div className="cart-heading cart-items ">
            {/* <span>Item Image</span> */}
            <span>{index+1}</span>
            <span className="cart-name">{name}</span> 
           <div className="qty-div"> 
            <button className="qty-button"onClick={() => {handleIncrement(1);}}>
                +1
            </button>
            <span className="inline my-2 bg-white px-1  ">{req_quanity}</span>
            <button className="qty-button"onClick={() => {handleDecrement(1);}}>
                -1
            </button>
            </div>
            <span className="cart-hide">₹{price}</span> 
            <span className="cart-subtotal">₹{req_quanity>0?req_quanity*price:0}</span> 
            <span className="btns">
            <span><button className="save-btn del-btn" onClick={()=>handleDelete()}>Delete</button></span>
            <span><button className="save-btn" onClick={()=>handleAdd()}>Save</button></span>
            </span>
        </div>
    )
}
export default CartItem