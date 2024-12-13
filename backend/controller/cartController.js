const mongoose = require("mongoose");
const Cart = require("../models/cartmodel");

//get cart information
const getcart = async (req, res) => {
  try {
    const { email } = req.params;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }

    // Fetch the cart
    const cart = await Cart.findOne({ email });

    // Check if cart exists
    if (!cart) {
      return res
        .status(404)
        .json({ error: "Cart not found for the provided email" });
    }

    // Respond with cart data
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createOrUpdateCart = async (req, res) => {
  const { email, products } = req.body; //products={_id,price,quantity}
  const saveCart = async (cartData) => {
    try {
      console.log(cartData, "cartData");
      if (!cartData || !Array.isArray(cartData.cart)) {
        throw new Error(
          "Invalid cart data: items is undefined or not an array"
        );
      }

      const items = cartData.cart.map((item) => ({
        _id: item._id,
        name: item.name,
        qty: item.qty,
        price: item.price,
      }));

      // Try to find the existing cart by email
      const existingCart = await Cart.findOne({ email: cartData.email });

      if (existingCart) {
        // Update the existing cart
        existingCart.cart = items;
        existingCart.total_qty = cartData.total_qty;
        existingCart.total_price = cartData.total_price;

        const updatedCart = await existingCart.save();
        console.log("Cart updated successfully:", updatedCart);
      } else {
        // Create a new cart if it doesn't exist
        const cart = new Cart({
          email: cartData.email,
          cart: items,
          total_qty: cartData.total_qty,
          total_price: cartData.total_price,
        });

        const savedCart = await cart.save();
        console.log("Cart saved successfully:", savedCart);
      }
    } catch (error) {
      console.error("Error saving cart:", error.message);
    }
  };

  try {
    // Find or create a cart for the user
    let cart = await Cart.findOne({ email });
    if (!cart) {
      // Map products to match the structure of ProductSchema
      const formattedProducts = products.map((item) => ({
        _id: item.id, // Ensure this matches the correct type
        name: item.name,
        qty: item.qty,
        price: item.price,
      }));
      cart = new Cart({ email, cart: formattedProducts }); // Use 'cart' field to store products
    } // Update existing cart
    else {
      products.forEach((item) => {
        console.log(item, "item");
        const existingProduct = cart.cart.find(
          (p) => p._id.toString() === item.id
        );
        console.log(existingProduct, "existing product");
        if (existingProduct) {
          existingProduct.qty = item.qty; // Update the quantity
          if (existingProduct.qty < 1)
            // Remove product
            cart.cart = cart.cart.filter((p) => p._id.toString() !== item.id);
        } else {
          //check the contents properllyyy
          cart.cart.push({ ...item, _id: item.id }); // Add new product
        }
      });
    }

    // Recalculate total price and quantity
    cart.total_price = cart.cart.reduce(
      (total, product) => total + product.price * product.qty,
      0
    );
    cart.total_qty = cart.cart.reduce(
      (total, product) => total + product.qty,
      0
    );
    console.log(cart, "cart");
    saveCart(cart);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove Product from Cart
const removeProductFromCart = async (req, res) => {
  const { email, id } = req.params;

  try {
    let cart = await Cart.findOne({ email });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.cart = cart.cart.filter((p) => p._id.toString() !== id);
    // Recalculate total price and quantity
    cart.total_price = cart.cart.reduce(
      (total, product) => total + product.price * product.qty,
      0
    );
    cart.total_qty = cart.cart.reduce(
      (total, product) => total + product.qty,
      0
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Clear Cart
const clearCart = async (req, res) => {
  const { email } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(email))
      //check for id validity
      return res.status(404).json({ error: "Cart not found" });
    await Cart.deleteOne({ email });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update a product
// mongo db model schema for cart that is array of products, total price and total qty, how will i update the products in cart through controller

// const addProductToCart = async (req, res) => {
//     const { usercred, product } = req.body; // Expecting cartId and product details in the request body

//     try {
//         const cart = await Cart.findById(usercred);
//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }

//         const existingProduct = cart.cart.find(p => p._id.toString() === product._id);
//         if (existingProduct) {
//             existingProduct.qty += product.qty;
//         } else {
//             cart.cart.push(product);
//         }

//         // Update totals
//         cart.total_price = cart.cart.reduce((total, p) => total + (p.price * p.qty), 0);
//         cart.total_qty = cart.cart.reduce((total, p) => total + p.qty, 0);

//         await cart.save();
//         return res.status(200).json(cart);
//     } catch (error) {
//         console.error('Error adding product to cart:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// //delete a product
// const deletion=async (req,res) => {
//     const {id}=req.params
//     if(!mongoose.Types.ObjectId.isValid(id))
//         return res.status(404).json({error:'No such product'})

//     const product =  await Product.findOneAndDelete({_id:id})
//     if(!product)//check if product exists
//         return res.status(404).json({error:'No such product'})
//     res.status(200).json(product)
// }

module.exports = {
  getcart,
  createOrUpdateCart,
  removeProductFromCart,
  clearCart,
};
