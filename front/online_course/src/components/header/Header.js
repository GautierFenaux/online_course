import React, { useState, useEffect } from "react";
import "./header.css";
// import styled from "styled-components";
import trompette from "../../assets/trompette.png";

const Header = () => {
  const pathd =
    "M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,250.7C1120,256,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z";

  const finalPathd =
    "M0,234L80,243.3C160,253,320,273,480,262.7C640,252,800,212,960,207.3C1120,202,1280,232,1360,240L1440,248L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z";

  const [scroll, setScroll] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [animationPath, setAnimationPath] = useState(pathd);

  const handleScroll = () => {
    const currentPosition = window.scrollY;
    setScrollPos(currentPosition);
    setScroll(currentPosition > scrollPos);
    console.log(scrollPos);
    setAnimationPath(currentPosition > scrollPos ? finalPathd : pathd);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPos]);

  return (
    <header className="header">
      <div className="flex section_padding">
        <div className="presentation-container flex-column">
          <h2>Apprendre la musique en ligne</h2>
          <p>
            Apprenez l'instrument que vous avez toujours voulu savoir jouer sans
            bouger de chez vous !
          </p>
          <button></button>
        </div>
        <div className="img-container">
          <img src={trompette} alt="" />
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          className={`path-to-animate ${scroll ? "animated" : ""}`}
          fill="#fff"
          fillOpacity="1"
          d={animationPath}
          style={{ transition: "d 1.8s ease" }}
          transform={`translate(0, ${scrollPos * 0.2}px)`}
        ></path>
      </svg>
    </header>
  );
};

export default Header;
