import {BrowserRouter,Routes,Route, useNavigate, Navigate} from 'react-router-dom'
import Welcome from "./pages/welcome";
import Header from './components/header';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Cart from './components/cart';
import {jwtDecode} from 'jwt-decode';
import Add from './components/Add';

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
      <div className="pages">
        <Routes>
        <Route path='/'
        element={<Welcome />}/>
        <Route path='/Api/user/login'
        element={<Login />}/>
        <Route path='/Api/user/register'
        element={<Register />}/>
        <Route path='/Api/products' exact
        element={<Home />}/>
        <Route path='/Api/cart' exact
        element={<Cart />}/>
        <Route path='/Api/products/add' exact
        element={<Add />}/>
        {/* if route isnt found */}
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
