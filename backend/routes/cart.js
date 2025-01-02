const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/requireAuth");

router.use(requireAuth); //authorization middleware

const {
  getcart,
  createOrUpdateCart,
  removeProductFromCart,
  clearCart,
} = require("../controller/cartController");

//'/api/cart/'

//get cart
router.get("/:email", getcart);

//create Or Update Cart
router.post("/", createOrUpdateCart);

//patch one product
router.delete("/:email/product/:id", removeProductFromCart);

//delete one product
router.delete("/:email", clearCart);

module.exports = router;
