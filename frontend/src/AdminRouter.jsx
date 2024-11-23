import React from 'react'
import Add from './components/product/productForm';
import Admin from './Admin/admin';
import AdminSidebar from './Admin/adminSidebar';
import UserManagement from './Admin/userManagement';
import ProductManagement from './Admin/productManagement';
import BusinessManagement from './Admin/businessManagement';
import BusinessForm from './components/business/businessForm';
import {Routes,Route, Navigate} from 'react-router-dom'

export default function AdminRouter() {
  return (
    <>
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
    </>
  )
}
