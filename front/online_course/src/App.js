import "./App.css";
import { Nav, Header } from "./components";
import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./components/home/Home";
import Authentification from "./components/authentification/Authentification";

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
      </Routes>
    </div>
  );
}

export default App;
