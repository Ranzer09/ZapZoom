const User = require("../models/usermodel");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" }); //creating token
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);
    res.status(200).json({
      email,
      token,
      id: user._id,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness,
    });
  } catch (error) {
    console.log("Error has occoured", error);
    res.status(400).json({ error: error.message });
  }
};

//signup user
const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    //register the user
    const user = await User.register(email, username, password);
    //create token
    const token = createToken(user._id);
    res.status(200).json({
      email,
      token,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness,
    });
  } catch (error) {
    console.log("Error has occoured", error);
    res.status(400).json({ error: error.message });
  }
};

//check for email
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.checkemail({ email });
    res.json({ isRegistered: !!user }); //convert the object to boolean
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const registerBusiness = async (req, res) => {
  const { email } = req.params;
  try {
    if (!validator.isEmail(email))
      //check for id validity
      return res.status(404).json({ error: "No such user" });
    const user = await User.findOneAndUpdate(
      { email: email },
      { isBusiness: true },
      { new: true }
    );
    console.log(user);
    if (!user)
      //check if user exists
      return res.status(404).json({ error: "No such user" });
    res.status(200).json(user);
  } catch (error) {
    console.log("error in verification", error);
  }
};

const getAll = async (req, res) => {
  try {
    const user = await User.find(
      {},
      "username _id email isAdmin isBusiness"
    ).sort({
      createdAt: -1,
    }); //user with descending order
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletion = async (req, res) => {
  console.log("deleting user");
  const { id } = req.params;
  const user = await User.findOneAndDelete({ _id: id });
  console.log(user, "user found");
  if (!user)
    //check if user exists
    return res.status(404).json({ error: "No such user" });
  res.status(200).json(user);
};

module.exports = {
  loginUser,
  registerUser,
  checkEmail,
  getAll,
  registerBusiness,
  deletion,
};
