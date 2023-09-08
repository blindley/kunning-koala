import { useContext, useState } from "react";
import { createContext } from "react";
import SignIn from "./SignIn";
import "./firebaseInit"; // only import to run initialization, no items to use
import { getAuth, onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";

export const UserContext = createContext(null);

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? <h1>Hello, {user.email}</h1> : <h1>Hello, Guest</h1>}
      <hr />
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);

  const signOut = async () => {
    await fbSignOut(getAuth());
  };

  onAuthStateChanged(getAuth(), (user) => {
    setUser(user);
  });

  return (
    <div>
      <UserContext.Provider value={{ user }}>
        <Header />
        {user ? (
          <div>
            <button onClick={signOut}>Sign Out</button>
          </div>
        ) : (
          <SignIn></SignIn>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
