import React from "react";
import { Box, Grid, Grid2, Typography } from "@mui/material";

const features = [
  {
    title: "Worldwide Shipping",
    description:
      "Get your orders delivered to any corner of the globe with our reliable shipping services.",
    image:
      "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/globe-free-img.png", // Replace with your image URL
  },
  {
    title: "Best Quality",
    description:
      "We ensure the highest quality standards for all our products to guarantee your satisfaction.",
    image:
      "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/quality-free-img.png", // Replace with your image URL
  },
  {
    title: "Best Offers",
    description:
      "Take advantage of exclusive deals and discounts to make your shopping even more rewarding.",
    image:
      "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/tag-free-img.png", // Replace with your image URL
  },
  {
    title: "Secure Payments",
    description:
      "Shop with confidence using our safe and secure payment options, protecting your data at all times.",

    image:
      "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/tag-free-img.png", // Replace with your image URL
  },
];

const ResponsiveFeatures = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid2
        container
        spacing={2}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              border: "1px solid #ddd",
              borderRadius: 2,
              padding: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <img
              src={feature.image}
              alt={feature.title}
              style={{ width: 80, height: 80, marginBottom: 16 }}
            />
            <Typography
              variant="h6"
              sx={{ marginBottom: 1, fontWeight: "600" }}
            >
              {feature.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {feature.description}
            </Typography>
          </Box>
        ))}
      </Grid2>
    </Box>
  );
};

export default ResponsiveFeatures;
