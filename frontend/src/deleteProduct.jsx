export const handleDelete = async (user, product, productdispatch) => {
  console.log(user);
  try {
    if (!user) return;
    //api request to delete the product
    const response = await fetch(
      VITE_API_URL + "/api/products/" + product._id,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      }
    );
    const json = (await response.json()) || null;

    if (response.ok) {
      productdispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  } catch (error) {
    console.log(error, "error in deletion");
  }
};
