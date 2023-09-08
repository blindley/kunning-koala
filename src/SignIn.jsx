import {
  AuthErrorCodes,
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e, faulty = false) => {
    e.preventDefault();
    setErrorMsg(null);

    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    await signInWithPopup(auth, provider);
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
