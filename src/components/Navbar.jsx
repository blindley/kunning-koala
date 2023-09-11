import { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? <h1>Hello, {user.email}</h1> : <h1>Hello, Guest</h1>}
      <Link to="/">Home</Link>
      <hr />
    </div>
  );
};

export default Navbar;
