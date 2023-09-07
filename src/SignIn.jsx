import { useContext } from "react";
import { UserContext } from "./App";

const SignIn = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser("Benjamin");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
