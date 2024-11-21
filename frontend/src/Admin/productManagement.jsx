import { useProductContext } from "../hooks/useProduct"
import ProductCard from "./productCard"
import './styles/productManagement.css'

function ProductManagement() {
    const {products}=useProductContext()
return(
    
    <div className="ProductManagement w-full ml-20">
        { products && products.map((product)=>
        (<ProductCard key={product._id} product={product} />))}
    </div>
)
    
}
export default ProductManagement