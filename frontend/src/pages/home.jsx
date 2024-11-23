import {useEffect,useState} from 'react'
import ProductCard from '../components/product/productCard'
import {useProductContext} from '../hooks/useProduct'
import {useAuthContext} from '../hooks/Auth/useAuthContext'
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/Auth/useLogout'
import Sidebar from './sidebar'

export function isTokenExpired (token) {
    if (!token) return true;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // current time in seconds

        return decoded.exp < currentTime;
    } catch (error) {
        console.error("Invalid token", error);
        return true; // If there's an error, consider the token expired
    }
};


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
            //console.log("Token is expired");
            navigate('/')
            logout()
        } 
        // Redirect if user is not logged in
        setProducts(products)
    }, [user,products]);
    //console.log('reloaded home')

    const handleFilterChange = (newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
      };
    
    const handleSortChange = (newSort) => {
        setSort(newSort);
    };  

    //console.log(filteredProducts)
    
  
    
    if (loading) {
        return <div>Loading...</div>; // Or your loading spinner
    }
    if(Error)
        return(<p>Failed to  fetch data. Server may be Down. Please Wait and try again later!</p>)
    return(
        <div className="home">
            
            <div className="flex p-4 pt-4 gap-8 justify-between w-full">  
            
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
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