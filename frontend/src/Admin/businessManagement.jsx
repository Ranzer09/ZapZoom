import BusinessCard from "./businessCard";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/Auth/useAuthContext";
import Loading from "../MUI Components/Loading";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getBusiness = async (user) => {
  try {
    const response = await fetch(VITE_API_URL + "/api/business", {
      method: "GET",
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    const json = await response.json();
    //console.log(json, "businesses");
    return json;
  } catch (error) {
    console.error("Error fetching businesses:", error.message);
  }
};

function BusinessManagement() {
  const { user, loading: userLoading } = useAuthContext();
  const [businesses, setBusinesses] = useState();
  const [loading, setLoading] = useState(true);
  //register business,fix bugs,smooth execution flow
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fetchBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getBusiness(user);
      setBusinesses(response);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {businesses?.length > 0 ? (
            <div className="BusinessManagement w-full grid my-5 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
              {businesses &&
                businesses?.map((business) => (
                  <BusinessCard
                    key={business._id}
                    business={business}
                    user={user}
                    loading={loading}
                    fetchdata={fetchBusinesses}
                  />
                ))}
            </div>
          ) : (
            <p
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Businesses not found :(
            </p>
          )}
        </>
      )}
    </>
  );
}
export default BusinessManagement;
