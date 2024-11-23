import React from 'react'
import Welcome from "./pages/welcome";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Cart from './pages/cart';
export default function UserRouter() {
  return (
    <>
    {/* <div className="pages">
        <Routes>
        <Route path='/'
        element={<Welcome />}/>
        <Route path='/Api/user/login' exact
        element={<Login />}/>
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
      </>
  )
}
