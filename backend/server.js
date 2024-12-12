const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const businessRoutes = require("./routes/business");
const adminRoutes = require("./routes/admin");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://zapzoom.onrender.com",
  "https://zapzoom-dev-front.onrender.com",
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/user/", userRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/cart/", cartRoutes);
app.use("/api/business/", businessRoutes);
app.use("/api/", adminRoutes);
