import React from "react";
import './nav.css';
import { NavLink } from 'react-router-dom';
import Authentification from "../authentification/Authentification";

const Nav = () => {
  return (
    <nav className="flex-row-between section_padding-sides">
      <div>
        <li>
          <NavLink to="/" activeClassName="active">onlineCourse.</NavLink>
        </li>
      </div>
      <div className="flex">
        <li>
          <NavLink to="/donner_des_cours" activeClassName="active">Donner des cours</NavLink>
        </li>
        <li>
          <NavLink to="/authentification" activeClassName="active">Connexion</NavLink>
        </li>
        {/* <li>
          <NavLink to="/contact" activeClassName="active">Contact</NavLink>
        </li> */}
      </div>
    </nav>
  );
};


export default Nav;
