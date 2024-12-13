import { useEffect, useState } from "react";
import ProductCard from "../components/product/productCard";
import { useProductContext } from "../hooks/useProduct";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/Auth/useLogout";
import Sidebar from "./sidebar";
import Loading from "../MUI Components/Loading";
import ResponsiveFeatures from "./ResponsiveFeatures";
import AdminSidebar from "../Admin/adminSidebar";
import BusinessSidebar from "../Admin/BusinessSidebar";

export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // current time in seconds

    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Invalid token", error);
    return true; // If there's an error, consider the token expired
  }
}

const Shop = () => {
  const { products, dispatch } = useProductContext();
  const [Error, setError] = useState(null);
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [Products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");

  const filteredProducts = Products.filter((product) => {
    const Category = filters.category
      ? product.category === filters.category
      : true;
    const Price = filters.price
      ? filters.price === "low"
        ? product.price > 0 && product.price <= 500
        : product.price > 500
      : true;
    return Category && Price;
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });
  useEffect(() => {
    scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Log the user object for debugging
    if (!user || user === null) {
      navigate("/Api/user/login");
      return;
    }

    if (isTokenExpired(user?.token)) {
      //console.log("Token is expired");
      logout();
    }
    // Redirect if user is not logged in
    setProducts(products);
  }, [user, products]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  if (Error)
    return (
      <p
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Failed to fetch data. Server may be Down. Please Wait and try again
        later!
      </p>
    );
  return loading ? (
    <Loading />
  ) : (
    <div className="w-full h-full">
      {" "}
      <div className="flex p-4 pt-4 gap-8 justify-between w-full">
        {/* {user?.isAdmin ? (
          <AdminSidebar />
        ) : user?.isBusiness ? (
          <BusinessSidebar />
        ) : (
          <></>
        )} */}
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-5 gap-10">
            {filteredProducts &&
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        ) : (
          <div
            style={{
              height: "20vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              textAlign: "center",
              width: "100%",
            }}
          >
            <p>Nothing to see here!</p>
          </div>
        )}
        <Sidebar
          filters={filters}
          sort={sort}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
      </div>
    </div>
  );
};
export default Shop;
