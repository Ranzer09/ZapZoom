import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Minicart from "./cart/miniCart";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import { useLogout } from "../hooks/Auth/useLogout";
import { useCartContext } from "../hooks/useCartContext";

const pages = ["", "Shop", "About"];
const navOptions = [
  { title: "Home", path: "Api/" },
  { title: "Shop", path: "/Api/products" },
  { title: "About", path: "/Api/about" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { user, loading: userloading } = useAuthContext();
  const { logout } = useLogout();
  const [isSticky, setIsSticky] = React.useState(false);
  const { cart, total_price, total_qty, loading } = useCartContext();

  useEffect(() => {
    console.log("cart", cart);
  }, [total_price, total_qty, loading]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logout();
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    setIsSticky(offset > 0);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed" // Important for sticky behavior
      sx={{
        transition:
          "position 0.2s ease-out, background-color 0.5s ease-out, box-shadow 0.5s ease-out, top 0.5s ease-out",
        backgroundColor: isSticky && "rgba(255, 255, 255, 0.3)",
        backdropFilter: isSticky && "blur(5px)",
        color: isSticky ? "black" : "white",
        top: isSticky ? 0 : "auto", // Adjust top dynamically
        height: { xs: "78px", md: "88px" },
      }}
    >
      <Container maxWidth="2xl">
        <Toolbar disableGutters>
          {/* Desktop Version */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={"/Api/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
              fontSize: "25px",
              transition: "color 0.3s ease",
              "&:hover": {
                color: !isSticky ? "black" : "white",
              },
            }}
          >
            ZapZoom
          </Typography>
          {!user ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                sx={{ fontSize: "18px", color: "white" }}
                href="/Api/user/login"
              >
                Login
              </Button>
              <Button
                sx={{ fontSize: "18px", color: "white" }}
                href="/Api/user/register"
              >
                Sign up
              </Button>
            </Box>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {navOptions.map(({ path, title }) => (
                  <Button
                    key={title}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={path}
                    sx={{
                      my: 2,

                      color: "inherit",
                      display: "block",
                      fontSize: "25px",
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: !isSticky ? "black" : "white",
                      },
                    }}
                  >
                    {title}
                  </Button>
                ))}
                {user.isAdmin && (
                  <Button
                    key={"admin"}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,

                      color: "inherit",
                      display: "block",
                      fontSize: "25px",
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: !isSticky ? "black" : "white",
                      },
                    }}
                    component={Link}
                    to={"/Api/admin"}
                  >
                    Admin Dashboard
                  </Button>
                )}
                {!user.isAdmin &&
                  (user.isBusiness ? (
                    <Button
                      key={"business"}
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,

                        color: "inherit",
                        display: "block",
                        fontSize: "25px",
                        fontFamily: "'Karla', sans-serif",
                        fontWeight: 400,
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: !isSticky ? "black" : "white",
                        },
                      }}
                      component={Link}
                      to={"/Api/business"}
                    >
                      Business Dashboard
                    </Button>
                  ) : (
                    <Button
                      key={"register"}
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,

                        color: "inherit",
                        display: "block",
                        fontSize: "25px",
                        fontFamily: "'Karla', sans-serif",
                        fontWeight: 400,
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: !isSticky ? "black" : "white",
                        },
                      }}
                      component={Link}
                      to={"/Api/admin/business/register"}
                    >
                      Register As Business
                    </Button>
                  ))}
              </Box>

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                }}
              >
                <a
                  className="no-underline"
                  href={"/Api/cart"}
                  style={{
                    marginTop: "10px",
                    color: isSticky ? "black" : "white",
                  }}
                >
                  <Minicart />
                </a>
                <Button
                  sx={{
                    color: "inherit",
                    "&:hover": {
                      color: !isSticky ? "black" : "white",
                    },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </>
          )}

          {/* mobile version */}
          {!user ? (
            <Box
              sx={{
                display: { xs: "grid", md: "none" },
                gridTemplateColumns: "3fr 1fr 1fr",
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to={"/Api/"}
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontSize: "35px",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: !isSticky ? "black" : "white",
                  },
                }}
              >
                ZapZoom
              </Typography>
              <Button
                sx={{ fontSize: "18px", color: "white" }}
                href="/Api/user/login"
              >
                Login
              </Button>
              <Button
                sx={{ fontSize: "18px", color: "white" }}
                href="/Api/user/register"
              >
                Sign up
              </Button>
            </Box>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {navOptions?.map(({ title, path }) => (
                    <MenuItem
                      key={title}
                      component={Link}
                      to={path}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontSize: "18px",
                          fontFamily: "monospace",
                          fontWeight: 700,
                        }}
                      >
                        {title}
                      </Typography>
                    </MenuItem>
                  ))}
                  {user.isAdmin && (
                    <MenuItem key="Admin" onClick={handleCloseNavMenu}>
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontSize: "18px",
                          fontFamily: "monospace",
                          fontWeight: 700,
                          textDecoration: "none",
                          color: "black",
                        }}
                        component={Link}
                        to={"/Api/admin"}
                      >
                        Admin Dashboard
                      </Typography>
                    </MenuItem>
                  )}
                  {!user.isAdmin &&
                    (user.isBusiness ? (
                      <MenuItem key="Business" onClick={handleCloseNavMenu}>
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontSize: "18px",
                            fontFamily: "monospace",
                            fontWeight: 700,
                            textDecoration: "none",
                            color: "black",
                          }}
                          component={Link}
                          to={"/Api/business"}
                        >
                          Business Dashboard
                        </Typography>
                      </MenuItem>
                    ) : (
                      <MenuItem key="Register" onClick={handleCloseNavMenu}>
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontSize: "18px",
                            fontFamily: "monospace",
                            fontWeight: 700,
                            textDecoration: "none",
                            color: "black",
                          }}
                          component={Link}
                          to={"/Api/admin/business/register"}
                        >
                          Register As Business
                        </Typography>
                      </MenuItem>
                    ))}
                  <MenuItem key="Logout" onClick={handleLogout}>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: "18px",
                        fontFamily: "monospace",
                        fontWeight: 700,
                      }}
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to={"/Api/"}
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontSize: "35px",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: !isSticky ? "black" : "white",
                  },
                }}
              >
                ZapZoom
              </Typography>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <a
                  className="no-underline"
                  href={"/Api/cart"}
                  style={{
                    marginTop: "10px",
                    color: isSticky ? "black" : "white",
                  }}
                >
                  <Minicart />
                </a>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
