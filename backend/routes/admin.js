const express = require("express");
const router = express.Router();
const { requireAdmin } = require("../middleware/requireAuth");

// router.use(requireAdmin); //authorization middleware

//controllers
const { verfiy } = require("../controller/businessController");
const { deletion } = require("../controller/usercontroller");

router.patch("/admin/business/:id", verfiy);
router.delete("/admin/user/:id", deletion);
module.exports = router;
