import {
  AuthErrorCodes,
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      const codesToIgnore = [AuthErrorCodes.POPUP_CLOSED_BY_USER];

      if (!codesToIgnore.includes(error.code)) {
        setErrorMsg(error.message);
      }
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
      <button onClick={googleSignIn}>Sign In With Google</button>
    </div>
  );
};

export default SignIn;
