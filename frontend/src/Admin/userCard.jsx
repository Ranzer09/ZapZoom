import "./styles/user.css";
import { useEffect, useState } from "react";
import { fetchCart } from "../context/cartContext";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import { Button } from "@mui/material";

function UserCard({ user: userData }) {
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(null);
  const { user } = useAuthContext();
  const { email, username, isAdmin, _id } = userData;
  const handleDelete = async () => {
    try {
      const response = await fetch(VITE_API_URL + "/api/admin/user/" + _id, {
        method: "DELETE",
        headers: { admin_id: user.id },
      });
      if (response.ok) {
        console.log("user deleted");
      }
    } catch (error) {
      console.log(error, "error deleting user");
    }
  };

  useEffect(() => {
    try {
      const User = { email, token: user?.token };
      fetchCart(User, setError, setLoading, setCart);
    } catch (error) {
      console.log("error fetching cart in users", error);
    }
  }, []);

  return (
    <div className="user w-full">
      <h3 className="name">{username}</h3>
      <p className="email">{email}</p>
      {!isAdmin ? (
        <button
          className="delete-button"
          onClick={() => {
            if (
              window.confirm(`Are you sure you want to delete ${username} ?`)
            ) {
              handleDelete();
            }
          }}
        >
          Delete User
        </button>
      ) : (
        <Button variant="outline" disabled>
          Cannot Delete Admin
        </Button>
      )}
      <div className="carting">
        <h1 className="cart-name col-span-2">Cart</h1>
        <p className="qty font-bold">Items</p>
        <p className="price font-bold">Price</p>
        <p className="qty">{cart?.total_qty ?? 0}</p>
        <p className="price">${cart?.total_price ?? 0}</p>
      </div>
    </div>
  );
}
export default UserCard;
