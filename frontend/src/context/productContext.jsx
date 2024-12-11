import { createContext, useReducer } from "react";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import { useEffect } from "react";
export const ProductContext = createContext();

export async function fetchProducts(user, dispatch) {
  try {
    const response = await fetch("/api/products", {
      method: "GET",
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    const json = await response.json();
    console.log(json, "updated products");
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
    // case 'UPDATE_PRODUCT':{
    //     let product=state.products.find(p => p._id.toString() === action.payload._id);
    //     console.log('updating')
    //     return{
    //         products:[...state.products,{...product,qty:action.payload.qty,
    //             price:action.payload.price,name:action.payload.name}]
    //     }
    // }
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

  useEffect(() => {
    console.log("useeffect");
  }, [state.products, dispatch]);
  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
