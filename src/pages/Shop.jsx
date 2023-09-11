import { useContext } from "react";
import { UserContext } from "../App";
import { ProductCard } from "../components/ProductCard";
import "./shop.css";

const Shop = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Kunning Koala</h1>
      </div>
      <div className="products">
        {Array.from({ length: 12 }, (_, index) => (
          <ProductCard key={index} productId={index} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
