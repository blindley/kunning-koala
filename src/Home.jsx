import { useContext } from "react";
import { getAuth, signOut as fbSignOut } from "firebase/auth";
import { UserContext } from "./App";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";

const Home = () => {
  const { user } = useContext(UserContext);

  const signOut = async () => {
    await fbSignOut(getAuth());
  };

  return (
    <div>
      {user ? (
        <div>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <div>
            <Link to="/signin">Sign in</Link>
            <br />
            <Link to="/signup">Sign up</Link>
            <br />
          </div>
        </div>
      )}
      <div>
        <ProductCard productId={0} />
        <ProductCard productId={1} />
        <ProductCard productId={2} />
        <ProductCard productId={3} />
        <ProductCard productId={4} />
        <ProductCard productId={5} />
      </div>
    </div>
  );
};

export default Home;
