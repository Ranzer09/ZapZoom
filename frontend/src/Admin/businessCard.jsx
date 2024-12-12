import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import Loading from "../MUI Components/Loading";
import { memo, useEffect } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, List } from "@mui/material";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const BusinessCard = memo(({ business, user, loading, fetchdata }) => {
  const navigate = useNavigate();
  let { name, date, products, status, admin, _id } = business;

  const verify = () => {
    fetch(VITE_API_URL + "/api/admin/business/" + _id, {
      method: "PATCH",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Unable to verify business");
        }
      })
      .then((json) => {
        console.log("Business Verified", json);
        fetchdata();
        return fetch(VITE_API_URL + "/api/user/register/" + admin, {
          method: "PATCH",
        });
      })
      .then((response2) => {
        if (response2.ok) {
          return response2.json();
        } else {
          throw new Error("Unable to verify user");
        }
      })
      .then((json2) => {
        console.log("Business and user Verified", json2);
      })
      .catch((error) => {
        console.log("Error in verification", error);
      });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(VITE_API_URL + "/api/business/" + _id, {
        method: "DELETE",
      });
      const json = (await response.json()) || null;
      if (response.ok) {
        console.log("Business Deleted", json);
        fetchdata();
      } else throw new Error("Unable to Delete");
    } catch (error) {
      console.log("error in deletion", error);
    }
  };

  if (!products) products = [];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {admin}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Joined in: {date}
            </Typography>
            {!status ? (
              <Button
                variant="contained"
                sx={{ color: "white" }}
                color="success"
                onClick={verify}
              >
                Verify
              </Button>
            ) : (
              <Typography variant="h6" sx={{ color: "green" }}>
                Verified!
              </Typography>
            )}
            <Typography>Products:</Typography>
            {!(products.length > 0) ? (
              <Typography>No products to show yet!</Typography>
            ) : (
              <Box
                sx={{
                  height: "20%",
                  overflow: "auto",
                  border: "solid 1px grey",
                }}
              >
                <List>
                  {products.map((name, index) => (
                    <li key={index} style={{ marginBottom: "5px" }}>
                      {" "}
                      {name}
                    </li>
                  ))}
                </List>
              </Box>
            )}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="error"
              sx={{}}
              onClick={() => {
                if (
                  window.confirm(`Are you sure you want to delete "${name}" ?`)
                ) {
                  handleDelete();
                }
              }}
            >
              Delete Business
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
});
export default BusinessCard;
