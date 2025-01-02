import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./Home.css";
import ResponsiveFeatures from "./ResponsiveFeatures";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box className="main-heading">
      <Typography variant="h2" style={{ fontFamily: '"Amatic SC", cursive' }}>
        Shop at ZapZoom Now!
      </Typography>
      <Button
        variant="contained"
        sx={{ color: "white" }}
        onClick={() => navigate("/Api/products")}
      >
        Shop Now!
      </Button>
    </Box>
  );
}
