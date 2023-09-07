import { useContext, useState } from "react";
import { createContext } from "react";
import SignIn from "./SignIn";

export const UserContext = createContext(null);

const Header = () => {
  const { user } = useContext(UserContext);

  return <>{user ? <h1>Hello, {user}</h1> : <h1>Hello, Guest</h1>}</>;
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
