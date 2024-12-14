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
import { Box, Typography } from "@mui/material";

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
    <Box sx={{ width: "100vw", height: "100%" }}>
      <Box
        sx={{
          display: { xs: "grid", md: "flex" },
          padding: "16px",
          paddingTop: "8px",
          gap: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            height: "100%",
            width: "100%",
          }}
        >
          <Sidebar
            filters={filters}
            sort={sort}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </Box>

        {products.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: {
                xs: "repeat(2,1fr)",
                sm: "repeat(3,1fr)",
                md: "repeat(2,1fr)",
                lg: "repeat(3,1fr)",
                xl: "repeat(5,1fr)",
              },
              rowGap: "20px",
              columnGap: "15px",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <Box>
                <Typography>No Products to show</Typography>
              </Box>
            )}
          </Box>
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
            <Typography>No Products to show</Typography>
          </div>
        )}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar
            filters={filters}
            sort={sort}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Shop;
