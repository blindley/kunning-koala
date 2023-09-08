import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInWithGoogle } from "./SignInWithGoogle";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e, faulty = false) => {
    e.preventDefault();
    setErrorMsg(null);

    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {errorMsg && <p>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <button type="submit">Sign In</button>
      </form>
      <br />
      <SignInWithGoogle />
    </div>
  );
};

export default SignIn;
