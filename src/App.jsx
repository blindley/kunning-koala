import { useContext, useState } from "react";
import { createContext } from "react";
import { getAuth, onAuthStateChanged, signOut as fbSignOut } from "firebase/auth";
import {
  Link,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./firebaseInit"; // only import to run initialization, no items to use
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export const UserContext = createContext(null);

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? <h1>Hello, {user.email}</h1> : <h1>Hello, Guest</h1>}
      <hr />
    </div>
  );
};

function RootLayout() {
  return (
    <div className="root-layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="" element={<Home />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Route>
  )
);

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(getAuth(), (user) => {
    setUser(user);
  });

  return (
    <UserContext.Provider value={{ user }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
