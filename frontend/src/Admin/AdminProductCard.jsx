import { useProductContext } from "../hooks/useProduct";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import { useState } from "react";
import { handleDelete } from "../deleteProduct";
import "./styles/DetailsStyles.css";

const ProductCard = ({ product }) => {
  const { dispatch: productdispatch } = useProductContext();
  const { user, loading } = useAuthContext();
  const [deleted, setDeleted] = useState(null);
  let image = `https://dummyjson.com/image/400x200/008080/ffffff?text=${product.name}`;
  // const handleDelete = async () => {
  //   try {
  //     setDeleted(null);
  //     if (!user) return;
  //     //api request to delete the product
  //     const response = await fetch("/api/products/" + product._id, {
  //       method: "DELETE",
  //       headers: {
  //         authorization: `Bearer ${user?.token}`,
  //       },
  //     });
  //     const json = (await response.json()) || null;

  //     if (response.ok) {
  //       setDeleted(true);
  //       productdispatch({ type: "DELETE_PRODUCT", payload: json });
  //     } else setDeleted(false);
  //   } catch (error) {
  //     console.log(error, "error in deletion");
  //   }
  // };

  return (
    <>
      {loading ? (
        <loading />
      ) : (
        <div className="product-card">
          <img
            loading="lazy"
            src={image}
            alt={product.name}
            className="w-full h-40 object-cover mb-2"
          />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">category: {product.category}</p>
          <p className="product-price">qty: {product.qty}</p>
          <p className="product-price">₹{product.price}</p>
          <button
            className="delete-button"
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
          </button>
        </div>
      )}
    </>
  );
};
export default ProductCard;
