import { useState } from "react";
import "./styles/DetailsStyles.css";
import { useProductContext } from "../hooks/useProduct";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import Loading from "../MUI Components/Loading";
import { Button, TextField } from "@mui/material";
import { fetchProducts } from "../context/productContext";
import { handleDelete } from "../deleteProduct";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const BusinessProductCard = ({ product }) => {
  const { name, price, category, qty, _id } = product;
  const { dispatch: productdispatch } = useProductContext();
  const [newProduct, setNewProduct] = useState({
    newName: name,
    newPrice: price,
    newCategory: category,
    newQty: qty,
  });
  const { newName, newPrice, newCategory, newQty } = newProduct;
  const [editing, setEdting] = useState(false);
  const { user, loading } = useAuthContext();

  let image = `https://dummyjson.com/image/400x200/008080/ffffff?text=${name}`;

  const handleEdit = async () => {
    try {
      //check if products is valid
      if (!newPrice || !newCategory || !newQty) {
        alert("All fields are required.");
        return;
      }
      // check if they have proper values
      if (newQty < 0) {
        return alert("Quantity cannot be less than 0");
      }
      if (newPrice < 1) return alert("Price cannot be less than 1");
      // update values in db
      const response = await fetch(VITE_API_URL + `/api/products/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...product,
          name,
          category: newCategory,
          price: newPrice,
          qty: newQty,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.token}`,
        },
      });
      // update values in context if sucessful
      console.log(response);
      if (response.ok) fetchProducts(user, productdispatch);
      //rerender if everything is fine
    } catch (error) {
      console.log("error occured", error);
    }

    console.log(newProduct);
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // Ensure this matches the input field structure
    console.log("cant edit");
    setNewProduct({ ...newProduct, [name]: value });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="product-card">
      <img
        loading="lazy"
        src={image}
        alt={name}
        className="w-full h-40 object-cover mb-2"
      />
      {!editing ? (
        <>
          <h3 name="name" className="product-name">
            {name}
          </h3>
          <p name="category" className="product-price">
            category: {category}
          </p>
          <p name="qty" className="product-price">
            qty: {qty}
          </p>
          <p name="price" className="product-price">
            ₹{price}
          </p>
          <Button
            onClick={() => {
              setEdting(true);
            }}
            variant="outlined"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            onClick={async () => {
              if (
                window.confirm(
                  `Are you sure you want to delete "${product.name}" ?`
                )
              ) {
                await handleDelete(user, product, productdispatch);
              }
            }}
          >
            Delete
          </Button>
        </>
      ) : (
        <form>
          <TextField
            name="newName"
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={newName}
            disabled
          />
          <TextField
            name="newCategory"
            id="outlined-basic"
            label="Category"
            variant="outlined"
            value={newCategory}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="newQty"
            id="outlined-basic"
            label="Quantity"
            variant="outlined"
            value={newQty}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="newPrice"
            id="outlined-basic"
            label="Price"
            variant="outlined"
            value={newPrice}
            onChange={(e) => handleChange(e)}
          />
          <Button
            onClick={() => {
              setEdting(false);
              handleEdit();
            }}
            variant="outlined"
          >
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
export default BusinessProductCard;
