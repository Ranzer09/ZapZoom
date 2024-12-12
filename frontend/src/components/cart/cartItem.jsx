import { useAuthContext } from "../../hooks/Auth/useAuthContext";
import { useCartContext } from "../../hooks/useCartContext";
import { useProductContext } from "../../hooks/useProduct";
import { addProductToCart } from "../product/productCard";
import { fetchProducts } from "../../context/productContext";
import { useState } from "react";
import "../../pages/Styles/cart.css";
import Loading from "../../MUI Components/Loading";
const VITE_API_URL = import.meta.env.VITE_API_URL;
function CartItem({ _id, index }) {
  const { cart, dispatch: cartdispatch } = useCartContext();
  const { name, qty, price } = cart[index];
  const { dispatch: productdispatch, products } = useProductContext();
  const [req_quantity, setReq_Quantity] = useState(qty);
  const { user, loading } = useAuthContext();

  const handleAdd = () => {
    console.log(qty, "cart quantity");
    let product_qty = products.find((obj) => obj._id === _id)?.qty;
    if (product_qty - req_quantity < 1)
      return window.alert(
        "Product out of stock, try again later or decrease the quantity"
      );
    let Product = {
      id: _id,
      name: name,
      price: price,
      qty: req_quantity,
    };
    cartdispatch({ type: "UPDATE_PRODUCT", payload: Product }); //update the cart locally
    addProductToCart(user?.email, Product, user) //add product to cart in database using function in ProductCard
      .then((cart) => {
        // Second API call to update info
        return fetch(VITE_API_URL + `/api/products/${_id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...Product,
            qty: product_qty - (req_quantity - qty),
          }),
          //fix this, the quatntity is changing
          //since cart quantity is increasing and the same thing is being used again
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
        //update the product context using function in it
        fetchProducts(user, productdispatch);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "This action will delete this item, Are you sure?"
    );
    if (confirmed) {
      const total_qty =
        products.find((obj) => obj._id === _id).qty + req_quantity;
      let Product = {
        _id,
        name,
        price,
        req_quantity,
      };
      //API REQUEST TO DELETE THE PRODUCT FROM CART IN DATABASE
      fetch(VITE_API_URL + "/api/cart/" + user?.email + "/product/" + _id, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((cart) => {
          // Second API call to update info in database
          return fetch(VITE_API_URL + `/api/products/${_id}`, {
            method: "PUT",
            body: JSON.stringify({ ...Product, qty: total_qty }),
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${user?.token}`,
            },
          });
        })
        .then((data) => {
          cartdispatch({ type: "REMOVE_PRODUCT", payload: Product }); //UPDATE CART CONTEXT
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } else return;
  };

  const handleIncrement = (Qty) => {
    setReq_Quantity(req_quantity + Qty);
  };

  const handleDecrement = (Qty) => {
    if (req_quantity === 1) {
      const confirmed = window.confirm(
        "This action will delete this item, Are you sure?(min quantity is 1)"
      );
      if (confirmed) setReq_Quantity(0);
      else return;
    } else if (!(req_quantity === 0 || req_quantity < 0))
      setReq_Quantity(req_quantity - Qty);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="cart-heading cart-items ">
          {/* <span>Item Image</span> */}
          <span>{index + 1}</span>
          <span className="item-name">{name}</span>
          <div className="qty-div">
            <button
              className="qty-button"
              onClick={() => {
                handleIncrement(1);
              }}
            >
              +1
            </button>
            <span className="inline my-2 bg-white px-1  ">{req_quantity}</span>
            <button
              className="qty-button"
              onClick={() => {
                handleDecrement(1);
              }}
            >
              -1
            </button>
          </div>
          <span className="cart-hide">₹{price}</span>
          <span className="cart-subtotal">
            ₹{req_quantity > 0 ? req_quantity * price : 0}
          </span>
          <span className="btns">
            <span>
              <button
                className="save-btn del-btn"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </span>
            <span>
              <button className="save-btn" onClick={() => handleAdd()}>
                Save
              </button>
            </span>
          </span>
        </div>
      )}
    </>
  );
}
export default CartItem;
