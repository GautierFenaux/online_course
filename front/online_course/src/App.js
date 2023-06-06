import "./App.css";
import { Nav, Header,MyCalendar } from "./components";
import { Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import RequireAuth from "./components/requireAuth/requireAuth";
import useWindowDimensions  from './hooks/UseWindowDimensions'
import Home from "./components/home/Home";
import Authentification from "./components/authentification/Authentification";
import Register from "./components/register/Register";
import HamburgerMenu from "./components/hamburgerMenu/HamburgerMenu";
import Dashboard from "./components/dashboard/Dashboard";

function App() {

  const HomeLayout = () => {
    
    const { height, width } = useWindowDimensions();

    return (
      <div>
        {width > 768 ? <Nav/> : < HamburgerMenu/>}
        <Header />
        <Home />
        <Outlet />
      </div>
    );
  };

  return (
    <div className="app">

      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
      </Routes>
      {/* <MyCalendar /> */}
    </div>
  );
}

export default App;
