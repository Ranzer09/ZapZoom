import React, { useEffect, useState } from "react";
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

const pages = ["", "Shop", "About"];
const navOptions = [
  { title: "", path: "Api/" },
  { title: "Shop", path: "/Api/products" },
  { title: "About", path: "/Api/about" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { user, loading } = useAuthContext();
  const { logout } = useLogout();
  const [isSticky, setIsSticky] = useState(false);

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
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position={isSticky ? "fixed" : "static"}
      sx={{ transition: "position 0.3s ease-in-out" }}
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
                color: "black",
              },
            }}
          >
            ZapZoom
          </Typography>
          {!user ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button className="flex-none text-white" href="/Api/user/login">
                Login
              </Button>
              <Button
                className="flex-none text-white"
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
                      color: "white",
                      display: "block",
                      fontSize: "25px",
                      fontFamily: "monospace",
                      fontWeight: 700,
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "black",
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
                      color: "white",
                      display: "block",
                      fontSize: "25px",
                      fontFamily: "monospace",
                      fontWeight: 700,
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "black",
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
                        color: "white",
                        display: "block",
                        fontSize: "25px",
                        fontFamily: "monospace",
                        fontWeight: 700,
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: "black",
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
                        color: "white",
                        display: "block",
                        fontSize: "25px",
                        fontFamily: "monospace",
                        fontWeight: 700,
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: "black",
                        },
                      }}
                      component={Link}
                      to={"/Api/admin/business/register"}
                    >
                      Register As Business
                    </Button>
                  ))}
              </Box>

              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <a
                  className="no-underline text-white"
                  href={"/Api/cart"}
                  style={{ marginTop: "10px" }}
                >
                  <Minicart />
                </a>
                <Button className="flex-none text-white" onClick={handleLogout}>
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
                    color: "black",
                  },
                }}
              >
                ZapZoom
              </Typography>
              <Button
                className="flex-none text-white"
                style={{ fontSize: "13px" }}
                href="/Api/user/login"
              >
                Login
              </Button>
              <Button
                className="flex-none text-white"
                style={{ fontSize: "13px" }}
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
                    color: "black",
                  },
                }}
              >
                ZapZoom
              </Typography>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <a
                  className="no-underline text-white"
                  href={"/Api/cart"}
                  style={{ marginTop: "10px" }}
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
