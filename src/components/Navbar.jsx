import { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";
import { signOut as fbSignOut, getAuth } from "firebase/auth";

const Navbar = () => {
  const { user } = useContext(UserContext);

  const signOut = async () => {
    await fbSignOut(getAuth());
  };

  return (
    <div className="navbar">
      {/* {user ? <h1>Hello, {user.email}</h1> : <h1>Hello, Guest</h1>} */}
      <div className="links">
        <Link to="/">Shop</Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
        </Link>
        {user ? (
          <>
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
