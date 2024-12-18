import { useState } from "react";
import { useProductContext } from "../../hooks/useProduct";
import { useAuthContext } from "../../hooks/Auth/useAuthContext";
import { Button, Label, TextInput } from "flowbite-react";
import Loading from "../../MUI Components/Loading";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const ProductForm = () => {
  const { user, loading } = useAuthContext();
  const { dispatch } = useProductContext();
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [Error, setError] = useState(null);
  const [EmptyFields, setEmptyFields] = useState(["empty"]);

  const options = ["Vehicle", "Fruit", "Furniture"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("User must be logged in");
      return;
    }

    try {
      const product = {
        name,
        qty,
        price,
        brand,
        category,
        business: user?.email,
      };
      ////console.log(product)
      const response = await fetch(VITE_API_URL + "/api/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user?.token}`,
        },
      });
      const json = await response.json();
      //console.log(json);
      ////console.log(json)
      if (!response.ok) {
        setError(json.error);
        if (json.EmptyFields) setEmptyFields(json.EmptyFields);
      }
      ////console.log(Error,EmptyFields)
      if (response.ok) {
        setBrand("");
        setName("");
        setQty("");
        setPrice("");
        setCategory("");
        setError(null);
        setEmptyFields(["empty"]);
        dispatch({ type: "CREATE_PRODUCT", payload: json });
        const response = await fetch(VITE_API_URL + "/api/business", {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user?.token}`,
          },
        });
        if (!response.ok) {
          setError(json.error);
        }
        ////console.log("It got uploaded!",json)
      }
    } catch (error) {
      //console.log("error in posting product", error);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="inline">
      <form
        action=""
        className="text-md creation grid w-full h-fit my-4 border-gray-200 border-2 p-4 rounded-4 mx-auto shadow-lg col-end-1"
        onSubmit={handleSubmit}
      >
        <h3 className="text-md">Add new Product</h3>

        <Label htmlFor="" className="text-md">
          Product Name
        </Label>
        <TextInput
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          maxLength={20}
          className="mb-2"
          color={
            EmptyFields.includes("name")
              ? "failure"
              : EmptyFields.includes("empty")
              ? ""
              : "success"
          }
        />

        <Label htmlFor="" className="text-md">
          Category
        </Label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className={`mb-2 ${
            EmptyFields.includes("qty")
              ? "border-red-400"
              : EmptyFields.includes("empty")
              ? ""
              : "border-green-400"
          }`}
        >
          <option value="">Select Category</option>
          {options.map((option, index) => (
            <option key={index} value={option.replace(/\s/g, "")}>
              {option}
            </option>
          ))}
        </select>

        <Label htmlFor="" className="text-md">
          Brand
        </Label>
        <TextInput
          type="text"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          maxLength={20}
          className="mb-2"
          color={
            EmptyFields.includes("brand")
              ? "failure"
              : EmptyFields.includes("empty")
              ? ""
              : "success"
          }
        />

        <Label htmlFor="" className="text-md">
          Quantity in Numbers
        </Label>
        <TextInput
          type="number"
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          className="mb-2"
          max={10000}
          color={
            EmptyFields.includes("qty")
              ? "failure"
              : EmptyFields.includes("empty")
              ? ""
              : "success"
          }
        />

        <Label htmlFor="" className="text-md">
          Price
        </Label>
        <TextInput
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="mb-2"
          max={10000}
          color={
            EmptyFields.includes("price")
              ? "failure"
              : EmptyFields.includes("empty")
              ? ""
              : "success"
          }
        />

        <Button className="mt-4" type="submit">
          {" "}
          Add
        </Button>
        {Error && (
          <p className="pt-4 text-red-800">This error occured: {Error}</p>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
