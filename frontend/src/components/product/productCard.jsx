import { useProductContext } from "../../hooks/useProduct";
import { useAuthContext } from "../../hooks/Auth/useAuthContext";
import { useState } from "react";
import "../styles/DetailsStyles.css";
import { useCartContext } from "../../hooks/useCartContext";
import { fetchProducts } from "../../context/productContext";
import Loading from "../../MUI Components/Loading";
import { Box, Button, Card, Paper, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function addProductToCart(email, product, user) {
  const response = await fetch(VITE_API_URL + "/api/cart", {
    method: "POST", // or 'PATCH' if updating
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify({
      email,
      products: [product], // Send as an array
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to add product to cart");
  }

  const cartData = await response.json();
  return cartData; // Handle the updated cart data as needed
}

const ProductCard = ({ product }) => {
  const { dispatch: cartdispatch, cart } = useCartContext();
  const { dispatch: productdispatch } = useProductContext();
  const [req_quanity, setReq_Quantity] = useState(0);
  const { user, loading } = useAuthContext();
  let image = `https://dummyjson.com/image/600x400/008080/ffffff?text=${product.name}`;

  const handleAdd = () => {
    if (req_quanity === 0) return;
    let Product = {
      id: product._id,
      name: product.name,
      price: product.price,
      qty: req_quanity,
    };
    let cartItemQty = cart.find((obj) => obj._id === product._id)?.qty;
    if (cartItemQty)
      Product = {
        ...Product,
        qty: req_quanity + cartItemQty,
      };
    if (product.qty < 0)
      return window.alert(
        "Product out of stock, try again later or decrease the quantity"
      );
    cartdispatch({ type: "UPDATE_PRODUCT", payload: Product });
    addProductToCart(user?.email, Product, user)
      .then((cart) => {
        // Second API call to update info
        return fetch(VITE_API_URL + `/api/products/${Product.id}`, {
          method: "PATCH",
          body: JSON.stringify({ ...Product, qty: product.qty }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user?.token}`,
          },
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update data");
        }
        return response.json();
      })
      .then((updatedResponse) => {
        fetchProducts(user, productdispatch);
      })
      .catch((error) => console.error("Error:", error));
    setReq_Quantity(0);
  };

  const handleIncrement = () => {
    if (product.qty < 1)
      return window.alert(
        "Product out of stock, try again later or decrease the quantity"
      );
    product.qty -= 1;
    setReq_Quantity(req_quanity + 1);
  };

  const handleDecrement = () => {
    if (!(req_quanity === 0)) {
      product.qty += 1;
      setReq_Quantity(req_quanity - 1);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            width: { xs: "150px", md: "280px" },
            height: { xs: "350px", md: "430px" },
            margin: "auto",
            marginTop: "20px",
          }}
        >
          <Card
            sx={{
              paddingBottom: "10px",
              display: "grid",
              gridTemplateColumns: "1fr",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20px",
            }}
          >
            <img
              loading="lazy"
              src={image}
              alt={product.name}
              className="object-cover mb-2"
              style={{
                minHeight: { xs: "105px", md: "250px" },
                minWidth: { xs: "105px", md: "250px" },
                justifySelf: "center",
                marginBottom: "20px",
              }}
            />
            <Box
              sx={{
                padding: "15px",
                display: "grid",
                gap: "8px",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", md: "18px" },
                  fontWeight: "800",
                  fontFamily: '"Manrope", sans-serif',
                }}
              >
                {product.brand}
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "18px",
                    md: "20px",
                    fontFamily: '"Manrope", sans-serif',
                  },
                }}
              >
                {product.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "16px",
                    md: "18px",
                    fontFamily: '"Manrope", sans-serif',
                  },
                }}
              >
                {product.category}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  fontWeight: "1000",
                  fontFamily: '"Manrope", sans-serif',
                }}
              >
                ${product.price}.00
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={handleDecrement}
                disabled={req_quanity === 0}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1" sx={{ margin: "0 10px" }}>
                {req_quanity}
              </Typography>
              <IconButton onClick={handleIncrement}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              onClick={() => {
                handleAdd();
              }}
            >
              Add to Cart
            </Button>
          </Card>
        </Box>

        // <div className="product-card">
        //   <img
        //     loading="lazy"
        //     src={image}
        //     alt={product.name}
        //     className="object-cover mb-2"
        //     style={{
        //       height: "100%",
        //       width: "80%",
        //       justifySelf: "center",
        //       marginBottom: "20px",
        //     }}
        //   />
        //   <h3 className="product-name">{product.name}</h3>
        //   <p className="product-price">category: {product.category}</p>
        //   <p className="product-price">{product.brand}</p>
        //   <p className="product-price">₹{product.price}</p>

        //   <div className="req-qty flex justify-center ">
        //     <button
        //       className="qty-button "
        //       onClick={() => {
        //         handleDecrement();
        //       }}
        //     >
        //       -
        //     </button>
        //     <p className="qty inline m-2">{req_quanity}</p>
        //     <button
        //       className="qty-button "
        //       onClick={() => {
        //         handleIncrement();
        //       }}
        //     >
        //       +
        //     </button>
        //   </div>
        //   <button
        //     className="add-button"
        //     onClick={() => {
        //       handleAdd();
        //     }}
        //   >
        //     Add to Cart
        //   </button>
        // </div>
      )}
    </>
  );
};
export default ProductCard;
