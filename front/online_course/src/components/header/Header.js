import React, { useState, useEffect } from "react";
import "./header.css";
// import styled from "styled-components";
import trompette from "../../assets/trompette.png";
import notes from "../../assets/notes_musique.png";

const Header = () => {
  const pathd =
    "M0,134L80,143.3C160,153,320,173,480,162.7C640,152,800,112,960,107.3C1120,102,1280,132,1360,140L1440,148L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z";
  // "M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,250.7C1120,256,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z";

  const finalPathd =
    "M0,94L80,84.7C160,75,320,55,480,65.3C640,75,800,115,960,119.7C1120,124,1280,94,1360,86.7L1440,79L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z";
  // "M0,234L80,243.3C160,253,320,273,480,262.7C640,252,800,212,960,207.3C1120,202,1280,232,1360,240L1440,248L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z";

  const [scroll, setScroll] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [animationPath, setAnimationPath] = useState(pathd);

  const handleScroll = () => {
    const currentPosition = window.scrollY;
    setScrollPos(currentPosition);
    setScroll(currentPosition > scrollPos);
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
          <button>Je m'inscris</button>
        </div>
        <div className="img-container">
          <img src={trompette} alt="" />
        </div>
      </div>
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
        <path
          className={`path-to-animate ${scroll ? "animated" : ""}`}
          fill="#fff"
          fillOpacity="1"
          d={animationPath}
          style={{ transition: "d 1.8s ease" }}
          transform={`translate(0, ${scrollPos * 0.2}px)`}
          filter="url(#f1)"
        ></path>
      </svg> */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
        <g transform={`translate(0, ${scrollPos * 0.2}px)`}>
          <path
            className={`path-to-animate ${scroll ? "animated" : ""}`}
            fill="#fff"
            fillOpacity="1"
            d={animationPath}
            style={{
              transition: "d 1.8s ease",
              filter: "drop-shadow(0 0 0.5px black)",
            }}
          ></path>
        </g>
      </svg>
    </header>
  );
};

export default Header;
