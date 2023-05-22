import React from "react";
import './nav.css';
import { NavLink } from 'react-router-dom';
import Authentification from "../authentification/Authentification";

const Nav = () => {
  return (
    // <nav className="nav flex-row-between section_padding-sides">
    <nav className="nav flex-row-between section_padding-sides">
      <div>
        <li>
          <NavLink to="/">onlineCourse.</NavLink>
        </li>
      </div>
      
      <div className="flex">
        <li className="li">
          <NavLink to="/donner_des_cours">Donner des cours</NavLink>
        </li>
        <li className="li">
          <NavLink to="/authentification">Connexion</NavLink>
        </li>
      </div>
    </nav>
  );
};


export default Nav;



