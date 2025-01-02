import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL;
export const useRegister = () => {
  const navigate = useNavigate();
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  //post request function
  const register = async (email, username, password) => {
    setLoading(true); //initially it is loading
    setError(null); //reset the error property to be false in the start

    //send post request to create user
    try {
      const response = await fetch(VITE_API_URL + "/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      const json = await response.json();

      //if there is error, set it
      if (!response.ok) {
        setLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        //save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        //update auth context
        dispatch({ type: "LOGIN", payload: json });
        setLoading(false);
        //create a cart for the user

        navigate("/Api/");
      }
    } catch (err) {
      console.log("Error occured", err);
    }
  };
  return { register, Loading, Error };
};
