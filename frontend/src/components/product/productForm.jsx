import {useState} from 'react'
import { useProductContext } from '../../hooks/useProduct'
import {useAuthContext} from '../../hooks/Auth/useAuthContext'
import { Button, Label, TextInput } from 'flowbite-react'
const ProductForm=()=>{

    const {user,loading}=useAuthContext()
    const {dispatch}=useProductContext()
    const[name,setName]=useState('')
    const[qty,setQty]=useState('')
    const[price,setPrice]=useState('')
    const[description,setDescription]=useState('')
    const[category,setCategory]=useState('')
    const[Error,setError]=useState(null)
    const[EmptyFields,setEmptyFields]=useState(['empty'])

const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user)
     {
        setError('User must be logged in')
         return
     }

    const product={name,qty,price,description,category}
     //console.log(product)
    const response = await fetch('/api/products',{
        method:'POST',
        body:JSON.stringify(product),
        headers:{'Content-Type':'application/json','authorization':`Bearer ${user.token}`}
    })
    const json=await response.json()
    //console.log(json)
    if(!response.ok){
        setError(json.error)
        if(json.EmptyFields)
            setEmptyFields(json.EmptyFields)
    }
        //console.log(Error,EmptyFields)
    if(response.ok)
    {   
        setDescription('')
        setName('')
        setQty('')
        setPrice('')
        setCategory('')
        setError(null)
        setEmptyFields(['empty'])
        dispatch({type:'CREATE_PRODUCT',payload:json})
        //console.log("It got uploaded!",json)
    }
}
if (loading) {
    return <div>Loading...</div>; // Or your loading spinner
}
    return( 
        <div className='inline'>
            <form action="" className="text-md creation grid w-full h-fit my-4 border-gray-200 border-2 p-4 rounded-4 mx-auto shadow-lg col-end-1" onSubmit={handleSubmit}>
            <h3 className="text-md">Add new Product</h3>
            
            <Label htmlFor="" className="text-md">
                Product Name
            </Label>
            <TextInput type="text"
            onChange={(e)=>setName(e.target.value)}
            value={name}
            className='mb-2'
            color={EmptyFields.includes('name')?'failure':EmptyFields.includes('empty')?'':"success"}
            />
            
            <Label htmlFor=""className="text-md">
            Category
            </Label>
            <TextInput type="text"
            onChange={(e)=>setCategory(e.target.value)}
            value={category}
            className='mb-2'
            color={EmptyFields.includes('qty')?'failure':EmptyFields.includes('empty')?'':"success"}
            />

            <Label htmlFor=""className="text-md">
               Quantity in Numbers
            </Label>
            <TextInput type="number"
            onChange={(e)=>setQty(e.target.value)}
            value={qty}
            className='mb-2'
            color={EmptyFields.includes('qty')?'failure':EmptyFields.includes('empty')?'':"success"}
            />

            <Label htmlFor=""className="text-md">
               Price
            </Label>
            <TextInput type="number"
            onChange={(e)=>setPrice(e.target.value)}
            value={price}
            className='mb-2'
            color={EmptyFields.includes('price')?'failure':EmptyFields.includes('empty')?'':"success"}
            />

            <Label htmlFor="" className="text-md">
                description
            </Label>
            <TextInput type="text"
            onChange={(e)=>setDescription(e.target.value)}
            value={description}
            className='mb-2'
            color={EmptyFields.includes('description')?'failure':EmptyFields.includes('empty')?'':"success"}
            />

            <Button className='mt-4' type='submit'> Add</Button>
            {Error && <p className='pt-4 text-red-800'>This error occured: {Error}</p>}
        </form>
    </div>
    )
}

export default ProductForm