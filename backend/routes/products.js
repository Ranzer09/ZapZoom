const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/requireAuth");

router.use(requireAuth); //authorization middleware

const {
  creation,
  readone,
  readall,
  deletion,
  updation,
} = require("../controller/productController");

//get all products
router.get("/", readall);

//get one product
router.get("/:id", readone);

//post one product
router.post("/", creation);

//patch one product
router.patch("/:id", updation);

//delete one product
router.delete("/:id", deletion);

module.exports = router;
