import { useContext, useState } from "react";
import { createContext } from "react";
import SignIn from "./SignIn";
import "./firebaseInit"; // only import to run initialization, no items to use

export const UserContext = createContext(null);

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? <h1>Hello, {user}</h1> : <h1>Hello, Guest</h1>}
      <hr />
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <SignIn></SignIn>
      </UserContext.Provider>
    </div>
  );
}

export default App;
