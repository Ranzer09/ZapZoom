import { createContext, useEffect, useReducer, useState } from "react";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchCart = async (
  user,
  setLoading,
  setError,
  setCart,
  dispatch
) => {
  if (!user) return;
  const email = user?.email;
  try {
    setLoading(true);
    const response = await fetch(VITE_API_URL + "/api/cart/" + email, {
      method: "GET",
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok", response);
    }
    const data = await response.json();
    await setCart(data);
    await dispatch({ type: "SET_CART", payload: data });
  } catch (error) {
    console.error("Cart not found", error.message);
    setError(error.message);
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 1250);
  }
};

export const CartContext = createContext();

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART": {
      return {
        ...state,
        cart: action.payload.cart,
        total_price: action.payload.total_price,
        total_qty: action.payload.total_qty,
      };
    }
    case "ADD_TO_CART": {
      const { qty, price } = action.payload;
      const updatedCart = [...state.cart, action.payload];
      return {
        ...state,
        cart: updatedCart,
        total_price: state.total_price + qty * price,
        total_qty: state.total_qty + qty,
      };
    }
    case "UPDATE_PRODUCT": {
      let productIndex = state.cart.findIndex(
        (p) => p._id.toString() === action.payload.id
      );
      if (productIndex === -1) return state;

      const { qty, price } = action.payload;

      // Create a new product object based on the existing one
      const updatedProduct = {
        ...state.cart[productIndex],
        qty,
        price,
      };

      // Create a new cart array with the updated product
      const updatedCart = [
        ...state.cart.slice(0, productIndex), // products before the updated one
        updatedProduct, // the updated product
        ...state.cart.slice(productIndex + 1), // products after the updated one
      ];

      return {
        ...state,
        cart: updatedCart,
        total_price:
          state.total_price +
          qty * price -
          state.cart[productIndex].qty * state.cart[productIndex].price,
        total_qty: state.total_qty + (qty - state.cart[productIndex].qty),
      };
    }
    case "REMOVE_PRODUCT": {
      const { _id, qty, price } = action.payload;
      const updatedCart = state.cart.filter((p) => p._id !== _id);
      return {
        ...state,
        cart: updatedCart,
        total_price: state.total_price - qty * price,
        total_qty: state.total_qty - qty,
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
        total_qty: 0,
        total_price: 0,
      };
    }
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(null);

  const initial_state = {
    cart: [],
    total_qty: 0,
    total_price: 0,
  };

  const [state, dispatch] = useReducer(CartReducer, initial_state);
  let total_qty = state.total_qty;
  useEffect(() => {
    fetchCart(user, setLoading, setError, setCart, dispatch);
  }, [total_qty, user]); // Fetch cart when user changes
  return (
    <CartContext.Provider value={{ ...state, dispatch, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};
