import { useNavigate } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import { useEffect } from "react";
import CartItem from "../components/cart/cartItem";
import "./Styles/cart.css";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import Loading from "../MUI Components/Loading";
import { Box, Grid2, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Cart() {
  const { user, loading: userloading } = useAuthContext();
  const navigate = useNavigate();
  const { cart, total_price, total_qty, loading } = useCartContext();
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, [user]);

  return (
    <>
      {loading || userloading ? (
        <Loading />
      ) : cart.length === 0 ? (
        <div className="cart-empty" style={{ height: "100vh" }}>
          Cart is empty
        </div>
      ) : (
        <Box>
          <Grid2
            container
            sx={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Grid2
              xs={12}
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "600",
                  color: "grey",
                  fontSize: { xs: "35px", sm: "40px" },
                }}
                variant="h2"
              >
                Cart
              </Typography>
            </Grid2>
            <Grid2
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: { md: "none" } }}>
                <hr />
                {cart.map((elem, i) => {
                  return (
                    <>
                      <CartItem key={elem._id} {...elem} index={i} />
                      <hr />
                    </>
                  );
                })}
              </Box>
              <Box sx={{ display: { sm: "none", xs: "none", md: "block" } }}>
                <hr />
                <Table
                  sx={{ minWidth: 680, display: { md: "block" } }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontSize: { xs: "16px", md: "18px" },
                          fontWeight: "600",
                          minWidth: "90px",
                        }}
                      ></TableCell>
                      <TableCell
                        sx={{
                          fontSize: { xs: "16px", md: "18px" },
                          fontWeight: "600",
                          minWidth: "122px",
                        }}
                      ></TableCell>
                      <TableCell
                        sx={{
                          fontSize: { xs: "16px", md: "18px" },
                          fontWeight: "600",
                          minWidth: "250px",
                          textAlign: "start",
                        }}
                      >
                        Product
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: { xs: "16px", md: "18px" },
                          fontWeight: "600",
                          minWidth: "120px",
                        }}
                      >
                        Price
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: { xs: "16px", md: "18px" },
                          fontWeight: "600",
                          minWidth: "125px",
                        }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: { xs: "16px", md: "18px" },
                          fontWeight: "600",
                          minWidth: "121px",
                        }}
                      >
                        Subtotal
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {cart.map((elem, i) => {
                    return (
                      <>
                        <CartItem key={elem._id} {...elem} index={i} />
                        <hr />
                      </>
                    );
                  })}
                </Table>
              </Box>
            </Grid2>
            <Grid2
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "end",
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 320 }} aria-label="simple table">
                  <TableBody>
                    <TableRow
                      sx={{
                        border: 0,
                      }}
                      colSpan={2}
                    >
                      <TableCell
                        sx={{
                          fontSize: { xs: "18px", md: "20px" },
                          fontWeight: "600",
                        }}
                        component="th"
                        scope="row"
                        colSpan={2}
                      >
                        Cart Totals
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        border: 0,
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontSize: { xs: "16px", md: "18px" },
                          fontWeight: "600",
                        }}
                      >
                        Subtotal:
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
                        ${total_price}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        border: 0,
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontSize: { xs: "16px", md: "18px" },
                          fontWeight: "600",
                        }}
                      >
                        Total
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
                        ${total_price}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid2>
          </Grid2>
        </Box>

        // <div className="cart">
        //   <div className="cart-heading">
        //     <span className="item-name">Item No.</span>
        //     {/* <span>Item Image</span> */}
        //     <span className="item-name">Name</span>
        //     <span className="item-name">Quantity</span>
        //     <span className="cart-hide">Price</span>
        //     <span className="item-name">Subtotal</span>
        //   </div>
        //   <div className="cart-item">
        //     {cart.map((elem, i) => {
        //       return <CartItem key={elem._id} {...elem} index={i} />;
        //     })}
        //   </div>
        //   <div className="total">
        //     <p className=" ">
        //       Total Quantity: <span className="end">{total_qty} </span>
        //     </p>
        //     <p className="total-price">
        //       Total Price: <span className="end">₹{total_price}</span>
        //     </p>
        //   </div>
        // </div>
      )}
    </>
  );
}

export default Cart;
