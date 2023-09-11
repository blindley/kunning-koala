import { useContext } from "react";
import { getAuth, signOut as fbSignOut } from "firebase/auth";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";

const Shop = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <ProductCard productId={0} />
      <ProductCard productId={1} />
      <ProductCard productId={2} />
      <ProductCard productId={3} />
      <ProductCard productId={4} />
      <ProductCard productId={5} />
    </div>
  );
};

export default Shop;
