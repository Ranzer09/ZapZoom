import { useProductContext } from "../hooks/useProduct";
import ProductCard from "./AdminProductCard";
import "./styles/productManagement.css";

function ProductManagement() {
  const { products } = useProductContext();
  return (
    <>
      {products?.length > 0 ? (
        <div className="ProductManagement w-full ml-20">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p style={{ height: "100vh" }}>No products available.</p>
      )}
    </>
  );
}
export default ProductManagement;
