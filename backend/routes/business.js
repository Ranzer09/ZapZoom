const express = require("express");
const router = express.Router();

//controllers
const {
  registerBusiness,
  getAll,
  deletion,
  verfiy,
  addProduct,
  removeProduct,
} = require("../controller/businessController");
//register route
router.post("/register", registerBusiness);
router.get("/", getAll);
router.post("/", addProduct);
router.delete("/", removeProduct);
router.delete("/:id", deletion);
module.exports = router;
