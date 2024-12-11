import React from "react";
import Add from "./components/product/productForm";
import Admin from "./Admin/admin";
import AdminSidebar from "./Admin/adminSidebar";
import UserManagement from "./Admin/userManagement";
import ProductManagement from "./Admin/productManagement";
import BusinessManagement from "./Admin/businessManagement";
import BusinessForm from "./components/business/businessForm";
import Welcome from "./pages/welcome";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import { Routes, Route, Navigate } from "react-router-dom";
import Business from "./Admin/Business";
import BusinessSidebar from "./Admin/BusinessSidebar";
import BusinessProductManagement from "./Admin/BisProdMgmt";
import { useAuthContext } from "./hooks/Auth/useAuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Loading from "./MUI Components/Loading";
import ProductForm from "./components/product/productForm";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Home from "./pages/Home";

export default function Router() {
  const { user, loading } = useAuthContext();
  let business = "isBusiness";
  let admin = "isAdmin";

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex ">
          {" "}
          {/* {user?.isAdmin ? (
            <AdminSidebar />
          ) : user?.isBusiness ? (
            <BusinessSidebar />
          ) : (
            <></>
          )} */}
          <div className="admin w-full grid justify-items-center">
            <Routes>
              <Route path="/Api" element={<Welcome />} />
              <Route path="/Api/home" element={<Home />} />
              <Route path="/Api/about" element={<About />} />
              <Route path="/Api/user/login" exact element={<Login />} />
              <Route path="/Api/user/register" exact element={<Register />} />
              <Route path="/Api/products" exact element={<Shop />} />
              <Route path="/Api/cart" exact element={<Cart />} />
              <Route
                path="/Api/admin"
                exact
                element={
                  <ProtectedRoute type="isAdmin">
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Api/admin/users/"
                exact
                element={
                  <ProtectedRoute type="isAdmin">
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Api/admin/products/"
                exact
                element={
                  <ProtectedRoute type="isAdmin">
                    <ProductManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Api/admin/business/"
                exact
                element={
                  <ProtectedRoute type="isAdmin">
                    <BusinessManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Api/admin/business/register"
                exact
                element={<BusinessForm />}
              />
              <Route
                path="/Api/business/"
                exact
                element={
                  <ProtectedRoute type="isBusiness">
                    <Business />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Api/business/register"
                exact
                element={
                  <ProtectedRoute type="isBusiness">
                    <BusinessForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Api/business/products"
                exact
                element={
                  <ProtectedRoute type="isBusiness">
                    <BusinessProductManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Api/business/products/add/"
                exact
                element={
                  <ProtectedRoute type="isBusiness">
                    <ProductForm />
                  </ProtectedRoute>
                }
              />
              {/* if route isnt found */}
              <Route path="*" element={<Navigate to="/Api" />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}
