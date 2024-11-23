import { useNavigate } from "react-router-dom"
import {useEffect, useState} from 'react'
import { Button } from "flowbite-react"
function BusinessCard({business,user,loading}) {
    const navigate=useNavigate()
    let {name,date,products,status,admin,_id}=business
    const [deleted,setDeleted]=useState()

    const verfiy = async ()=>{
           //api request to verify the business
        try {
            const response = await fetch('/api/business/'+_id,{
                 method:'PATCH',
             }) 
              const json=await response.json()||null
              if(response.ok)
                console.log('Business Verified',json)
              else
                 throw new Error("Unable to verify");
        } catch (error) {
                console.log('error in verification',error)
        } 
        };

    const handleDelete=async()=>
            {  
                try {
                const response = await fetch('/api/business/'+_id,{
                    method:'DELETE',
                }) 
                    const json=await response.json()||null
                    if(response.ok)
                    console.log('Business Deleted',json)
                    else
                        throw new Error("Unable to Delete");
            } catch (error) {
                    console.log('error in deletion',error)
            }         
            };

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