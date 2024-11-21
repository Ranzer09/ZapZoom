//edit product price, quantity, delete of own business
import { useNavigate } from "react-router-dom"
import { useProductContext } from "../hooks/useProduct"
import ProductCard from "./productCard"
import './styles/productManagement.css'

function ManageProduct() {
    const navigate = useNavigate()
    // if(user.email!=business.email)
    // {
    //     navigate('/');
    //     return;
    // }
    const {products}=useProductContext()
// Filter the total products to find those whose names are in the business product list
// const businessProducts = products.filter(product => businessProductNames.has(product.name));

return(
    
    <div className="ProductManagement w-full ml-20">
        {/* { businessProducts && businessProducts.map((product)=>
        (<ProductCard key={product._id} product={product} />))} */}
    </div>
)
    
}
export default ManageProduct