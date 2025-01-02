const mongoose = require("mongoose");
const Business = require("../models/businessmodel");
const User = require("../models/usermodel");

//signup business
const registerBusiness = async (req, res) => {
  const { name, admin, date } = req.body;
  try {
    const exists = (await User.findOne({ email: admin })) || null;
    if (!exists) {
      throw Error("Email is not registered!");
    }
    //register the business
    const business = await Business.register(name, admin, date);
    console.log("Business Registered!", business);
    res.status(200).json({ name, admin });
  } catch (error) {
    console.log("Error has occoured", error);
    res.status(400).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const business = await Business.find({}).sort({ createdAt: -1 }); //business with descending order
    res.status(200).json(business);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  const { business, name } = req.body;
  try {
    const bis = await Business.findOneAndUpdate(
      { admin: business },
      { $addToSet: { products: name } },
      { new: true }
    );
    if (!bis)
      //check if product exists
      return res.status(404).json({ error: "No such business" });
    res.status(200).json(bis);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const removeProduct = async (req, res) => {
  const { business, name } = req.body;
  try {
    const bis = await Business.findOneAndUpdate(
      { admin: business },
      { $pull: { products: name } }, // Use $pull to remove the product
      { new: true } // Return the updated document
    );

    if (!bis)
      // Check if the business exists
      return res.status(404).json({ error: "No such business" });

    res.status(200).json(bis);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const verfiy = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      //check for id validity
      return res.status(404).json({ error: "No such Business" });
    const business = await Business.findOneAndUpdate(
      { _id: id },
      { status: true },
      { new: true }
    );
    if (!business)
      //check if business exists
      return res.status(404).json({ error: "No such Business" });
    res.status(200).json(business);
  } catch (error) {
    console.log("error in verification", error);
  }
};

const deletion = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such business" });

  const business = await Business.findOneAndDelete({ _id: id });
  if (!business)
    //check if business exists
    return res.status(404).json({ error: "No such business" });
  res.status(200).json(business);
};

module.exports = {
  registerBusiness,
  getAll,
  deletion,
  verfiy,
  addProduct,
  removeProduct,
};
