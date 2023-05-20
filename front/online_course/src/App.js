import "./App.css";
import { Nav, Header } from "./components";
import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./components/home/Home";
import Authentification from "./components/authentification/Authentification";
import Register from "./components/register/Register";


function App() {
  const HomeLayout = () => {
    // ... perhaps some authentication logic to protect routes?
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  };

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
