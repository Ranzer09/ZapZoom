import { useNavigate } from "react-router-dom"
import {useEffect} from 'react'
import { Button } from "flowbite-react"
function BusinessCard({business,user,loading}) {
    const navigate=useNavigate()
    let {name,date,products,status,admin,}=business

    const verfiy = async ()=>{

    }
    if(!products)
        products=[]
    // useEffect(() => {
    //     if(user.email!=admin)
    //         navigate('/')
    // }, [user])
    if(loading)
        return(<div>Loading...</div>)
    return(
        <div className="BusinessCard">
            <h3 className="business-name">{name}</h3>
            <h6 className="business-joined">Joined in: {date}</h6>
            {
                !status?
                <Button className="business-verfiy btn-success" onClick={verfiy}>Verify</Button>
                :<p className="text-green-400">Verified!</p>
            }
            <p>Products:</p>
            {
                (!(products.length>0))?
                <p>No products to show yet!</p>
                :<div className="products-to-be-added overflow-auto h-12">
                    <ul>
                    {products.map((name,index)=>
                    <li key={index}>
                        {name} 
                    </li>)}
                    </ul>
                </div>
            }
            <button className="delete-button" onClick={() => 
            {
                if (window.confirm(`Are you sure you want to delete "${name}" ?`)) {handleDelete();} }}>
                Delete Business
            </button>
        </div>
    )
}
export default BusinessCard