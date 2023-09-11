import { AuthErrorCodes, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignInWithGoogle = () => {
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  const googleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

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
      {errorMsg && <p>{errorMsg}</p>}
      <button onClick={googleSignIn}>Sign In With Google</button>
    </div>
  );
};
