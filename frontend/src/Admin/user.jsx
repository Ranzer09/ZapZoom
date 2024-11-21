import './styles/user.css'
function User() {

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
        }    


    return(
        <div className="user w-full">
            <h3 className="name">Nathan</h3>
            <p className="email">nathanial@gmail.com</p>
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
                <p className="qty">24</p>
                <p className="price">$2400</p>
            </div>
        </div>
    )
}
export default User