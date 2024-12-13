import { Box, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <Box>
      <footer
        className="text-center text-lg-start bg-primary "
        style={{ marginTop: "10px", color: "white" }}
      >
        <Box>
          <Box className="container text-center text-md-start mt-5">
            <Box className="row mt-3">
              <Box className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <Typography
                  variant="h6"
                  className="text-uppercase fw-bold mb-4"
                  sx={{ textAlign: "center", width: "100%" }}
                >
                  ZapZoom
                </Typography>
                <Typography sx={{ textAlign: "center" }}>
                  Our mission is to provide our customers with a seamless
                  shopping experience that combines variety, value, and
                  exceptional service. We strive to make online shopping easy,
                  secure, and fun, bringing you the products you want, right to
                  your doorstep.
                </Typography>
              </Box>

              <Box className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <Typography
                  variant="h6"
                  className="text-uppercase fw-bold mb-4"
                >
                  Products
                </Typography>
                <Typography>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    component={Link}
                    to={"/Api/products"}
                    className="pe-auto text-decoration-underline text-reset"
                  >
                    VEHICLES
                  </Typography>
                </Typography>
                <Typography>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    component={Link}
                    to={"/Api/products"}
                    className="pe-auto text-decoration-underline text-reset"
                  >
                    FRUITS
                  </Typography>
                </Typography>
                <Typography>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    component={Link}
                    to={"/Api/products"}
                    className="pe-auto text-decoration-underline text-reset"
                  >
                    FURNITURE
                  </Typography>
                </Typography>
              </Box>

              <Box className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <Typography
                  variant="h6"
                  className="text-uppercase fw-bold mb-4"
                >
                  Contact
                </Typography>
                <Typography>
                  <Typography className="fas fa-home me-3"></Typography>{" "}
                  Mangalore
                </Typography>
                <Typography className="fas fa-envelope me-3">
                  malcolmdsouza0902@gmail.com
                </Typography>
                <Typography className="fas fa-phone me-3">
                  +91 xxxxxx0087
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05" }}
        >
          © 2024 Copyright
          <Typography
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
            className="pe-auto text-decoration-underline text-reset fw-bold"
          >
            ZapZoom.com
          </Typography>
        </Box>
      </footer>
    </Box>
  );
}
