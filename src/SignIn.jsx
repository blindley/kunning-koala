import { AuthErrorCodes, getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const handleSubmit = async (e, faulty = false) => {
    e.preventDefault();

    const auth = getAuth();
    const email = "test@test.test";
    const password = faulty ? "x" : "testpassword";

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
        console.log("Error: invalid password");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Sign In</button>
      </form>
      <form onSubmit={(e) => handleSubmit(e, true)}>
        <button type="submit">Faulty Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
