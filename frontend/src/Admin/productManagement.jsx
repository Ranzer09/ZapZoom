import { Box } from "@mui/material";
import { useProductContext } from "../hooks/useProduct";
import ProductCard from "./AdminProductCard";
import "./styles/productManagement.css";
import React, { useEffect } from "react";
function ProductManagement() {
  const { products } = useProductContext();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      {products?.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: {
              xs: "repeat(2,1fr)",
              sm: "repeat(4,1fr)",
              lg: "repeat(5,1fr)",
              xl: "repeat(6,1fr)",
            },
            rowGap: "20px",
            height: "100%",
            marginTop: "20px",
          }}
        >
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Box>
      ) : (
        <p style={{ height: "100vh" }}>No products available.</p>
      )}
    </>
  );
}
export default ProductManagement;
