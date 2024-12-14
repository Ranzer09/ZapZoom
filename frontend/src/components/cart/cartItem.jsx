import { useAuthContext } from "../../hooks/Auth/useAuthContext";
import { useCartContext } from "../../hooks/useCartContext";
import { useProductContext } from "../../hooks/useProduct";
import { addProductToCart } from "../product/productCard";
import { fetchProducts } from "../../context/productContext";
import { useEffect, useState } from "react";
import "../../pages/Styles/cart.css";
import Loading from "../../MUI Components/Loading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Input, TextField } from "@mui/material";
const VITE_API_URL = import.meta.env.VITE_API_URL;

function CartItem({ _id, index }) {
  const { cart, dispatch: cartdispatch } = useCartContext();
  const { name, qty, price } = cart[index];
  const { dispatch: productdispatch, products } = useProductContext();
  const [req_quantity, setReq_Quantity] = useState(qty);
  const { user, loading } = useAuthContext();
  let product = products?.find((obj) => obj._id === _id);
  let image = `https://dummyjson.com/image/250x250/008080/ffffff?text=${product?.name}`;

  const handleAdd = () => {
    if (product?.qty - req_quantity < 1)
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
          method: "PATCH",
          body: JSON.stringify({
            ...Product,
            qty: product.qty - (req_quantity - qty),
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
    if (qty != req_quantity) return alert("Please Update your cart first!");
    const confirmed = window.confirm(
      "This action will delete this item, Are you sure?"
    );
    if (confirmed) {
      const total_qty = product.qty + req_quantity;
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
            method: "PATCH",
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

  const handleChange = (e) => {
    if (req_quantity <= 0) {
      const confirmed = window.confirm(
        "This action will delete this item, Are you sure?(min quantity is 1)"
      );
      if (confirmed) setReq_Quantity(0);
      else return;
    }
    setReq_Quantity(e.target.value);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: { xs: 320, sm: 380 }, display: { md: "none" } }}
            aria-label="simple table"
          >
            <TableBody>
              <TableRow
                colSpan={2}
                sx={{
                  border: 0,
                  borderRight: 0,
                }}
              >
                <TableCell
                  colSpan={2}
                  component="th"
                  scope="row"
                  onClick={handleDelete}
                >
                  <svg
                    class="ast-mobile-svg ast-close-svg"
                    fill="currentColor"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
                  </svg>
                </TableCell>
              </TableRow>
              <TableRow colSpan={2}>
                <TableCell colSpan={2} component="th" scope="row">
                  <img
                    loading="lazy"
                    src={image}
                    alt="product"
                    style={{
                      width: "70px",
                      height: "70px",
                      margin: "auto",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  border: 0,
                }}
              >
                <TableCell
                  sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "600",
                  }}
                  component="th"
                  scope="row"
                >
                  Product:
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "end",
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "400",
                  }}
                  component="th"
                  scope="row"
                >
                  {name}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  border: 0,
                }}
              >
                <TableCell
                  sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "600",
                  }}
                  component="th"
                  scope="row"
                >
                  Price:
                </TableCell>{" "}
                <TableCell
                  sx={{
                    textAlign: "end",
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "400",
                  }}
                  component="th"
                  scope="row"
                >
                  ${price}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  border: 0,
                }}
              >
                <TableCell
                  sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "600",
                  }}
                  component="th"
                  scope="row"
                >
                  Quantity:
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "end",
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "400",
                  }}
                  component="th"
                  scope="row"
                >
                  <TextField
                    id="outlined-number"
                    type="number"
                    value={req_quantity}
                    onChange={(e) => handleChange(e)}
                    sx={{
                      width: { xs: "80px", sm: "80px" },
                      height: "50px",
                      padding: { xs: "5px 5px", sm: "5px 5px" },
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  border: 0,
                }}
              >
                <TableCell
                  sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "600",
                  }}
                  component="th"
                  scope="row"
                >
                  Subtotal:
                </TableCell>{" "}
                <TableCell
                  sx={{
                    textAlign: "end",
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "400",
                  }}
                  component="th"
                  scope="row"
                >
                  ${qty * price}
                </TableCell>
              </TableRow>
              <TableRow colSpan={2}>
                <TableCell sx={{ textAlign: "center" }} colSpan={2}>
                  <Button
                    variant="contained"
                    className="save-btn"
                    onClick={() => handleAdd()}
                  >
                    Update Cart
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <TableBody>
              <TableRow
                colSpan={2}
                sx={{
                  border: 0,
                  borderRight: 0,
                }}
              >
                <TableCell
                  colSpan={2}
                  component="th"
                  scope="row"
                  onClick={handleDelete}
                  sx={{ minWidth: "90px" }}
                >
                  <svg
                    class="ast-mobile-svg ast-close-svg"
                    fill="currentColor"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
                  </svg>
                </TableCell>
                <TableCell
                  colSpan={2}
                  component="th"
                  scope="row"
                  sx={{ minWidth: "122px" }}
                >
                  <img
                    loading="lazy"
                    src={image}
                    alt="product"
                    style={{
                      width: "90px",
                      height: "90px",
                      margin: "auto",
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "left",
                    fontSize: { md: "18px" },
                    fontWeight: "400",
                    minWidth: "250px",
                  }}
                  component="th"
                  scope="row"
                >
                  {name}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "start",
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "400",
                    fontFamily: "'Lato',sans-serif",
                    minWidth: "120px",
                  }}
                  component="th"
                  scope="row"
                >
                  ${price}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "start",
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "400",

                    minWidth: "125px",
                  }}
                  component="th"
                  scope="row"
                >
                  <TextField
                    id="outlined-number"
                    type="number"
                    value={req_quantity}
                    onChange={(e) => handleChange(e)}
                    sx={{
                      width: { md: "80px" },
                      height: "50px",
                      padding: { xs: "5px 5px", sm: "5px 5px" },
                    }}
                  />
                </TableCell>

                <TableCell
                  sx={{
                    textAlign: "start",
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: "400",

                    minWidth: "121px",
                  }}
                  component="th"
                  scope="row"
                >
                  ${qty * price}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }} colSpan={2}>
                  <Button
                    variant="contained"
                    className="save-btn"
                    onClick={() => handleAdd()}
                  >
                    Update Cart
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        // <div className="cart-heading cart-items ">
        //   {/* <span>Item Image</span> */}
        //   <span>{index + 1}</span>
        //   <span className="item-name">{name}</span>
        //   <div className="qty-div">
        //     <button
        //       className="qty-button"
        //       onClick={() => {
        //         handleDecrement(1);
        //       }}
        //     >
        //       -1
        //     </button>
        //     <span className="inline my-2 bg-white px-1  ">{req_quantity}</span>
        //     <button
        //       className="qty-button"
        //       onClick={() => {
        //         handleIncrement(1);
        //       }}
        //     >
        //       +1
        //     </button>
        //   </div>
        //   <span className="cart-hide">₹{price}</span>
        //   <span className="cart-subtotal">
        //     ₹{req_quantity > 0 ? req_quantity * price : 0}
        //   </span>
        //   <span className="btns">
        //     <span>
        //       <button
        //         className="save-btn del-btn"
        //         onClick={() => handleDelete()}
        //       >
        //         Delete
        //       </button>
        //     </span>
        //     <span>
        //       <button className="save-btn" onClick={() => handleAdd()}>
        //         Save
        //       </button>
        //     </span>
        //   </span>
        // </div>
      )}
    </>
  );
}
export default CartItem;
