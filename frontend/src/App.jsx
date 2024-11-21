import {BrowserRouter,Routes,Route, useNavigate, Navigate} from 'react-router-dom'
import Welcome from "./pages/welcome";
import Header from './components/header';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Cart from './pages/cart';
import {jwtDecode} from 'jwt-decode';
import Add from './components/product/productForm';
import Admin from './Admin/admin';
import AdminSidebar from './Admin/adminSidebar';
import UserManagement from './Admin/userManagement';
import ProductManagement from './Admin/productManagement';
import BusinessManagement from './Admin/businessManagement';
import BusinessForm from './components/business/businessForm';

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

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      {/* <div className="pages">
        <Routes>
        <Route path='/'
        element={<Welcome />}/>
       
        <Route path='/Api/user/register'
        element={<Register />}/>
        <Route path='/Api/products' exact
        element={<Home />}/>
        <Route path='/Api/cart' exact
        element={<Cart />}/>
        if route isnt found
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div> */}
      <div className="flex ">
        <AdminSidebar/>
        <div className="admin w-full grid justify-items-center">
        <Routes>
        <Route path='/'
        element={<Admin />}/> 
        <Route path='/admin/products/add/' exact
        element={<Add />}/>
        <Route path='/admin/users/' exact
        element={<UserManagement/>}/>
        <Route path='/admin/products/' exact
        element={<ProductManagement/>}/>
        <Route path='/admin/business/' exact
        element={<BusinessManagement/>}/>
        <Route path='/admin/business/register' exact
        element={<BusinessForm/>}/>
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </div>
        </div> 
      </BrowserRouter>
    </div>
  );
}

export default App;
