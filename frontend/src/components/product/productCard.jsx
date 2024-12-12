import { useProductContext } from "../../hooks/useProduct";
import { useAuthContext } from "../../hooks/Auth/useAuthContext";
import { useState } from "react";
import "../styles/DetailsStyles.css";
import { useCartContext } from "../../hooks/useCartContext";
import { fetchProducts } from "../../context/productContext";
import Loading from "../../MUI Components/Loading";
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
  //console.log(cartData,'responded')
  return cartData; // Handle the updated cart data as needed
}

const ProductCard = ({ product }) => {
  const { dispatch: cartdispatch, cart } = useCartContext();
  const { dispatch: productdispatch } = useProductContext();
  const [req_quanity, setReq_Quantity] = useState(0);
  const { user, loading } = useAuthContext();
  let image = `https://dummyjson.com/image/400x200/008080/ffffff?text=${product.name}`;

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
        //console.log("Cart updated sucessfully",cart)
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
        <div className="product-card">
          <img
            loading="lazy"
            src={image}
            alt={product.name}
            className="object-cover mb-2"
            style={{
              height: "100%",
              width: "80%",
              justifySelf: "center",
              marginBottom: "20px",
            }}
          />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">category: {product.category}</p>
          {/* <p className="product-price">qty: {product.qty}</p> */}
          <p className="product-price">₹{product.price}</p>

          <div className="req-qty flex justify-center ">
            <button
              className="qty-button "
              onClick={() => {
                handleDecrement();
              }}
            >
              -
            </button>
            <p className="qty inline m-2">{req_quanity}</p>
            <button
              className="qty-button "
              onClick={() => {
                handleIncrement();
              }}
            >
              +
            </button>
          </div>
          <button
            className="add-button"
            onClick={() => {
              handleAdd();
            }}
          >
            Add to Cart
          </button>
        </div>
      )}
    </>
  );
};
export default ProductCard;
