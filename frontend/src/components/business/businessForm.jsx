import { useState } from "react";
import { useAuthContext } from "../../hooks/Auth/useAuthContext";
import { Button, Label, TextInput } from "flowbite-react";
import Loading from "../../MUI Components/Loading";
import { Box, Typography } from "@mui/material";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const BusinessForm = () => {
  //user is the admin for the business, they can manage the products of the business
  //add manageproducts route only for users that have a business
  const { user, loading } = useAuthContext();
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [admin, setAdmin] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleAdd = (mode, variable = "") => {
    if (mode === "add") {
      if (input === null || input === "") return;
      setProducts((prev) => {
        return [...prev, input];
      });
      setInput("");
    } else if (mode === "remove")
      if (products.length > 0) {
        //console.log(variable);
        setProducts(products.filter((name) => name !== variable));
      }
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("User must be logged in");
      return;
    }

    const business = { name, admin, date };
    ////console.log(product)
    const response = await fetch(VITE_API_URL + "/api/business/register", {
      method: "POST",
      body: JSON.stringify(business),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user?.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setDate("");
      setAdmin("");
      // setProducts([])
      setError(null);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : user.isBusiness ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Typography>You are already Registered as a Business!</Typography>
        </Box>
      ) : (
        <div className="inline">
          <form
            action=""
            className="text-md creation grid w-72 h-fit my-4 border-gray-200 border-2 p-4 rounded-4 mx-auto shadow-lg col-end-1"
            onSubmit={handleSubmit}
          >
            <h3 className="text-md">Register Business</h3>

            <Label htmlFor="" className="text-md">
              Business Name:
            </Label>
            <TextInput
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              maxLength={30}
              className="mb-2"
            />

            {/* <Label htmlFor=""className="text-md">
            Products:
            </Label> */}

            {/* show the produts */}

            {/* <TextInput type="text"
            onChange={(e)=>setInput(e.target.value)}
            value={input}
            className='mb-2'
            />
            {!(products.length>0)?<></>:<div className="products-to-be-added overflow-auto h-12">
                {products.map((name,index)=>
                <li key={index}>
                    {name} 
                    <button className='ml-1 text-red-800' onClick={()=>{handleAdd('remove',name)}}>x</button>
                </li>)}
            </div>}
            <Button className='mt-4' onClick={()=>{handleAdd('add')}}>Add Product</Button> */}

            <Label htmlFor="" className="text-md">
              Joining year:
            </Label>
            <TextInput
              type="number"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              maxLength={30}
              className="mb-2"
            />

            <Label htmlFor="" className="text-md">
              Admin Mail
            </Label>
            <TextInput
              type="email"
              maxLength={30}
              onChange={(e) => setAdmin(e.target.value)}
              value={admin}
              className="mb-2"
            />

            <Button className="mt-4" type="submit">
              Register
            </Button>
            {error && (
              <p className="pt-4 text-red-800">This error occured: {error}</p>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default BusinessForm;
