import { useContext } from "react";
import { getAuth, signOut as fbSignOut } from "firebase/auth";
import { UserContext } from "./App";
import { Link } from "react-router-dom";

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
          <Link to="/signin">Sign in</Link>
          <br />
          <Link to="/signup">Sign up</Link>
          <br />
        </div>
      )}
    </div>
  );
};

export default Home;
