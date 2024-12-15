import { Box } from "@mui/material";
import { Card } from "flowbite-react";
import React, { useEffect } from "react";
function Business() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Box
      sx={{ height: { xs: "100%" } }}
      className="h-screen grid my-5 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center"
    >
      <Card
        href="/Api/business/products/add"
        className="w-3/4 bg-gray-300 no-underline"
        style={{ height: "200px" }}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Add New Product
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Business Owners can add a their product into the product database.
        </p>
      </Card>
      <Card
        style={{ height: "200px" }}
        href="/Api/business/products/"
        className="w-3/4 bg-gray-300 no-underline"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Products
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Business Owners can manage their products in the product database.
        </p>
      </Card>
    </Box>
  );
}

export default Business;
