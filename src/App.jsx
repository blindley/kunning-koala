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
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";

export const UserContext = createContext(null);

function RootLayout() {
  return (
    <div className="root-layout">
      <Navbar />
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
      <Route path="cart" />
    </Route>
  )
);

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(getAuth(), (user) => {
    setUser(user);
  });

  return (
    <div className="App">
      <UserContext.Provider value={{ user }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
