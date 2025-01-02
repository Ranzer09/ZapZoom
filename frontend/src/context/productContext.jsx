import { createContext, useReducer } from "react";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import { useEffect } from "react";
export const ProductContext = createContext();
const VITE_API_URL = import.meta.env.VITE_API_URL;
export async function fetchProducts(user, dispatch) {
  try {
    const response = await fetch(VITE_API_URL + "/api/products", {
      method: "GET",
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "SET_PRODUCT", payload: json });
    } else {
      console.error("Failed to fetch products:", json);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return { products: action.payload };
    case "CREATE_PRODUCT":
      return { products: [action.payload, ...state.products] };
    case "DELETE_PRODUCT":
      return {
        products: state.products.filter((p) => p._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, {
    products: [],
  });
  const { user, loading } = useAuthContext();
  useEffect(() => {
    if (user !== null) fetchProducts(user, dispatch);
  }, [dispatch, user]);

  useEffect(() => {}, [state.products, dispatch]);
  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
