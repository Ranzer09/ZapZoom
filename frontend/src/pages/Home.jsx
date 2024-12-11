import React from "react";
import { Box, Typography } from "@mui/material";
import "./Home.css";
import Landing from "./Landing";
import About from "./About";
import ResponsiveFeatures from "./ResponsiveFeatures";
export default function Home() {
  return (
    <Box>
      <Box className="home-container">
        <Landing />
      </Box>
      <Box sx={{ paddingTop: "10px" }}>
        <ResponsiveFeatures />
      </Box>
      <Box sx={{ paddingTop: "10px" }}>
        <About />
      </Box>
    </Box>
  );
}
