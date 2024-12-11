const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization required" });
  }

  const token = authorization.split(" ")[1]; //split the header and get the token value

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    //pass on user id to show that it is authenticated
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log("Auth error");
    res.status(401).json({ error: error.message });
  }
};
const requireAdmin = async (req, res, next) => {
  //verify authentication
  const { admin_id } = req.headers;
  if (!admin_id) {
    return res.status(401).json({ error: "Authorization required" });
  }

  try {
    const admin = await User.findOne({ _id: admin_id });
    console.log(admin);
    if (admin.isAdmin) next();
    else throw new Error("Not an admin");
  } catch (error) {
    console.log("Auth error", error.message);
    res.status(401).json({ error: error.message });
  }
};

module.exports = { requireAuth, requireAdmin };
