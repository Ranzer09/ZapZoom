import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { Select } from "flowbite-react";
import React from "react";

const Sidebar = ({ onFilterChange, onSortChange }) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", lg: "16rem" },
        padding: 2,
        backgroundColor: "grey.200",
        height: { xs: "80%", md: "inherit" },
        borderRadius: 2,
        display: { xs: "grid", md: "block" },
        gridTemplateRows: { xs: "30px 140px" },
        columnGap: { xs: "20px" },
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontSize: { xs: "1.25rem", lg: "1.5rem" },
          fontWeight: "semibold",
          marginBottom: 2,
          textAlign: "center",
        }}
      >
        Filters
      </Typography>

      <Box
        sx={{
          display: { xs: "grid", md: "block" },
          gridTemplateColumns: { xs: "repeat(3,1fr)" },
        }}
      >
        <Box>
          <Typography
            variant="body2"
            component="h3"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Category
          </Typography>
          <Select
            labelId="category-label"
            id="category"
            label="Category"
            z
            onChange={(e) => onFilterChange({ category: e.target.value })}
            sx={{ fontSize: { xs: "0.75rem", lg: "1rem" } }} // Responsive font size
          >
            <option value="">All</option>
            <option value="Fruit">Fruit</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Furniture">Furniture</option>
            {/* <option value="sport">Sport</option> */}
          </Select>
        </Box>

        <Box>
          <Typography
            variant="body2"
            component="h3"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Price
          </Typography>
          <Select
            labelId="category-label"
            id="category"
            label="Category"
            z
            onChange={(e) => onFilterChange({ price: e.target.value })}
            sx={{ fontSize: { xs: "0.75rem", lg: "1rem" } }} // Responsive font size
          >
            <option value="">All</option>
            <option value="low">0 - 500</option>
            <option value="high">Above 500 </option>
          </Select>
        </Box>

        <Box>
          <Typography
            variant="body2"
            component="h3"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Sort By
          </Typography>
          <Select
            labelId="category-label"
            id="category"
            label="Category"
            z
            onChange={(e) => onSortChange(e.target.value)}
            sx={{ fontSize: { xs: "0.75rem", lg: "1rem" } }} // Responsive font size
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
