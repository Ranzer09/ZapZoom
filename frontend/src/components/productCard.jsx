import { useProductContext } from "../hooks/useProduct"
import {useAuthContext} from '../hooks/useAuthContext'
import {useState} from 'react'
import './styles/DetailsStyles.css'
import { useCartContext } from "../hooks/useCartContext"

export async function addProductToCart  (email, product,user){
  const response = await fetch('/api/cart', {
      method: 'POST', // or 'PUT' if updating
      headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
          email,
          products: [product], // Send as an array
      }),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add product to cart');
  }

  const cartData = await response.json();
  console.log(cartData,'responded')
  return cartData; // Handle the updated cart data as needed
};

const ProductCard = ({product})=>{
    const {dispatch:cartdispatch}=useCartContext();
    const {dispatch:productdispatch} = useProductContext();
    const [req_quanity,setReq_Quantity]=useState(0);
    const {user,loading}=useAuthContext();
    const [deleted,setDeleted]=useState(null);
    let image=`https://dummyjson.com/image/400x200/008080/ffffff?text=${product.name}`

    const handleAdd=()=>{
      if(req_quanity===0)
        return
      let Product={id:product._id,
      name:product.name,price:product.price,qty:req_quanity};
      console.log(product.qty-req_quanity,'totalqty',product.qty,' ',req_quanity)
      if(product.qty<0)
        return(window.alert('Product out of stock, try again later or decrease the quantity'))
      console.log('Product info',Product)
      cartdispatch({ type: 'UPDATE_PRODUCT', payload: Product });
      addProductToCart(user.email, Product,user)
      .then(cart => {
        console.log("Cart updated sucessfully",cart)
        // Second API call to update info
        return fetch(`/api/products/${Product.id}`,{
          method:'PATCH',
          body:JSON.stringify({...Product,qty:product.qty}),
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
      .catch(error => console.error('Error:', error))
      setReq_Quantity(0)
      console.log('product',product.qty)
    }

    const handleIncrement=()=>{
      if(product.qty<1)
        return(window.alert('Product out of stock, try again later or decrease the quantity'))
      product.qty-=1
      setReq_Quantity(req_quanity+1)
    }
    const handleDecrement=()=>{
      
      if(!(req_quanity===0)){
        product.qty+=1
        setReq_Quantity(req_quanity-1)
      }
      
      
    }


    const handleDelete=async()=>{
        console.log(deleted)
        setDeleted(null)
        console.log(setDeleted,'this is after setting deleted null')
        if(!user)
            return
        const response = await fetch('/api/products/'+product._id,{
            method:'DELETE',
            headers:{
                'authorization':`Bearer ${user.token}`
            }
        }) 
        const json=await response.json()||null

         if(response.ok)
         {
          console.log(deleted)
            setDeleted(true)
            console.log(setDeleted,'this is after setting deleted true')
            console.log(deleted)
            productdispatch({type:'DELETE_PRODUCT',payload:json})
         }
         else
            setDeleted(false)
    }

    if (loading) {
      return <div>Loading...</div>; // Or your loading spinner
  }


    return(
  <div  className="product-card">
  
  <img loading="lazy" src={image} alt={product.name} className="w-full h-40 object-cover mb-2" />
  <h3 className="product-name">{product.name}</h3>
  <p className="product-price">category: {product.category}</p>
  <p className="product-price">qty: {product.qty}</p>
  <p className="product-price">₹{product.price}</p>
  <button className="delete-button" onClick={() => 
  {if (window.confirm(`Are you sure you want to delete "${product.name}" ?`)) {handleDelete();} }}>
    Delete 
  </button>
  <div className="req-qty flex justify-center ">
  <button className="qty-button "onClick={() => {handleIncrement();}}>
    +
  </button>
  <p className="qty inline m-2">
    {req_quanity}
  </p>
  <button className="qty-button "onClick={() => {handleDecrement();}}>
    -
  </button>
  </div>
  <button className="add-button"onClick={() => {handleAdd();}}>
    Add to Cart
  </button>
</div>

    )
}
export default ProductCard

