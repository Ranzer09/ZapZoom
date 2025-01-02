import { useAuthContext } from "../hooks/Auth/useAuthContext";
import { useProductContext } from "../hooks/useProduct";
import { useEffect, useState } from "react";
import { getBusiness } from "./businessManagement";
import "./styles/productManagement.css";
import BusinessProductCard from "./BisProductCard";
import Loading from "../MUI Components/Loading";
import { Box } from "@mui/material";

function BusinessProductManagement() {
  const { products } = useProductContext();
  const { user, loading: userLoading } = useAuthContext();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [businessProducts, setBusinessProducts] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Fetch businesses when the user is available
    if (!userLoading && user) {
      const fetchBusinesses = async () => {
        try {
          setLoading(true);
          const response = await getBusiness(user);
          setBusinesses(response);
        } catch (error) {
          console.error("Error fetching businesses:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBusinesses();
    }
  }, [userLoading, user]);

  useEffect(() => {
    // Filter products when businesses are updated
    if (businesses.length > 0 && products.length > 0) {
      try {
        const business =
          businesses.find((bis) => bis.admin === user?.email)?.products || [];
        const filteredProducts = products.filter((product) =>
          business.includes(product.name)
        );
        setBusinessProducts(filteredProducts);
      } catch (error) {
        console.error("Error filtering products:", error);
      }
    }
  }, [businesses, products, user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : businessProducts.length > 0 ? (
        // <div className="grid sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-5 gap-10"></div>
        <Box
          sx={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              md: "repeat(3,1fr)",
              lg: "repeat(4,1fr)",
              xl: "repeat(5,1fr)",
            },
            rowGap: "20px",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {businessProducts.map((businessProduct) => (
            <BusinessProductCard
              key={businessProduct._id}
              product={businessProduct}
            />
          ))}
        </Box>
      ) : (
        <p
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No business products available.
        </p>
      )}
    </>
  );
}

export default BusinessProductManagement;
