import { useNavigate } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import { useEffect } from "react";
import CartItem from "../components/cart/cartItem";
import "./Styles/cart.css";
import { useAuthContext } from "../hooks/Auth/useAuthContext";

function Cart() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { cart, total_price, total_qty } = useCartContext();
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, [user]);
  if (cart.length === 0) {
    return <div className="cart-empty">Cart is empty</div>;
  }

  return (
    <div className="cart">
      <div className="cart-heading">
        <span className="item-name">Item No.</span>
        {/* <span>Item Image</span> */}
        <span className="item-name">Name</span>
        <span className="item-name">Quantity</span>
        <span className="cart-hide">Price</span>
        <span className="item-name">Subtotal</span>
      </div>
      <div className="cart-item">
        {cart.map((elem, i) => {
          return <CartItem key={elem._id} {...elem} index={i} />;
        })}
      </div>
      <div className="total">
        <p className=" ">
          Total Quantity: <span className="end">{total_qty} </span>
        </p>
        <p className="total-price">
          Total Price: <span className="end">₹{total_price}</span>
        </p>
      </div>
    </div>
  );
}

export default Cart;
