import { useAuthContext } from "../hooks/Auth/useAuthContext";
import { useProductContext } from "../hooks/useProduct";
import { useEffect, useState } from "react";
import { getBusiness } from "./businessManagement";
import "./styles/productManagement.css";
import BusinessProductCard from "./BisProductCard";
import Loading from "../MUI Components/Loading";

function BusinessProductManagement() {
  const { products } = useProductContext();
  const { user, loading: userLoading } = useAuthContext();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [businessProducts, setBusinessProducts] = useState([]);

  useEffect(() => {
    // Fetch businesses when the user is available
    if (!userLoading && user) {
      const fetchBusinesses = async () => {
        try {
          setLoading(true);
          const response = await getBusiness(user);
          setBusinesses(response);
        } catch (error) {
          console.error("Error fetching businesses:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBusinesses();
    }
  }, [userLoading, user]);

  useEffect(() => {
    // Filter products when businesses are updated
    if (businesses.length > 0 && products.length > 0) {
      try {
        const business =
          businesses.find((bis) => bis.admin === user?.email)?.products || [];
        const filteredProducts = products.filter((product) =>
          business.includes(product.name)
        );
        setBusinessProducts(filteredProducts);
      } catch (error) {
        console.error("Error filtering products:", error);
      }
    }
  }, [businesses, products, user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : businessProducts.length > 0 ? (
        <div className="ProductManagement w-full ml-20">
          {businessProducts.map((businessProduct) => (
            <BusinessProductCard
              key={businessProduct._id}
              product={businessProduct}
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
          No business products available.
        </p>
      )}
    </>
  );
}

export default BusinessProductManagement;
