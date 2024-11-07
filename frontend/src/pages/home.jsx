import {useEffect,useState} from 'react'
import ProductCard from '../components/productCard'
import {useProductContext} from '../hooks/useProduct'
import {useAuthContext} from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { isTokenExpired } from '../App'
import { useLogout } from '../hooks/useLogout'
import Sidebar from './sidebar'



const Home=()=>{
    const {products,dispatch}=useProductContext()
    const [Error, setError] = useState(null);
    const {user,loading}=useAuthContext()
    const navigate = useNavigate()
    const {logout}=useLogout()
    const [Products, setProducts] = useState([]);  
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('');
    const filteredProducts = Products.filter((product) => {
        const Category = filters.category ? product.category === filters.category : true;
        const Price = filters.price
          ? filters.price === 'low'
            ? product.price > 0 && product.price <=500
            : product.price > 500
          : true;
        return Category && Price;
      }).sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        return 0;
      });

    useEffect(() => {
        // Log the user object for debugging
        if (!user||user===null) {
            navigate('/');
            return;
        }
        
        if (isTokenExpired(user.token)) 
            {
            console.log("Token is expired");
            navigate('/')
            logout()
        } 
        // Redirect if user is not logged in
        setProducts(products)
    }, [user,products]);
    console.log('reloaded home')

    const handleFilterChange = (newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
      };
    
    const handleSortChange = (newSort) => {
        setSort(newSort);
    };  

    console.log(filteredProducts)
    
  
    
    if (loading) {
        return <div>Loading...</div>; // Or your loading spinner
    }
    if(Error)
        return(<p>Failed to  fetch data. Server may be Down. Please Wait and try again later!</p>)
    return(
        <div className="home">
            
            <div className="flex p-4 pt-4 gap-8 justify-between">  
            
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredProducts && filteredProducts.map((product)=>
                    (<ProductCard key={product._id} product={product} />))}
                </div>
                <Sidebar 
                filters={filters}
                        sort={sort}
                        onFilterChange={handleFilterChange}
                        onSortChange={handleSortChange}
                />
             </div>
        </div>
    )
}
export default Home