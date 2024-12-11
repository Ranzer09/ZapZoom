import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import Loading from "../MUI Components/Loading";
import { memo, useEffect } from "react";
const BusinessCard = memo(({ business, user, loading, fetchdata }) => {
  const navigate = useNavigate();
  let { name, date, products, status, admin, _id } = business;

  const verify = () => {
    fetch("/api/admin/business/" + _id, {
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
        return fetch("/api/user/register/" + admin, {
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
      const response = await fetch("/api/business/" + _id, {
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
        <div className="BusinessCard">
          <h3 className="business-name">{name}</h3>
          <h6 className="business-name">{admin}</h6>
          <h6 className="business-joined">Joined in: {date}</h6>
          {!status ? (
            <Button className="business-verfiy btn-success" onClick={verify}>
              Verify
            </Button>
          ) : (
            <p className="text-green-400">Verified!</p>
          )}
          <p>Products:</p>
          {!(products.length > 0) ? (
            <p>No products to show yet!</p>
          ) : (
            <div className="products-to-be-added overflow-auto h-12">
              <ul>
                {products.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            className="delete-button"
            onClick={() => {
              if (
                window.confirm(`Are you sure you want to delete "${name}" ?`)
              ) {
                handleDelete();
              }
            }}
          >
            Delete Business
          </button>
        </div>
      )}
    </>
  );
});
export default BusinessCard;
