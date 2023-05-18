import React, { useState, useEffect } from "react";
import "./header.css";
import styled from "styled-components";
import trompette from "../../assets/trompette.png";

const Header = () => {

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledHeader className={`header flex section_padding ${scroll ? "scrolled" : ""}`}>
      <div className="presentation-container flex-column">
        <h2>Apprendre la musique en ligne</h2>
        <p>Apprenez l'instrument que vous avez toujours voulu savoir jouer sans bouger de chez vous !</p>
        <button></button>
      </div>
      <div className="img-container">
        <img src={trompette} alt="" />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  /* Styles for the default header */
  background-color: #77FDAF;
  padding: 20px;

  &.scrolled {
    /* Styles for the header when scrolled */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: scaleY(0.9); /* Scale down the height */
    transition: transform 0.3s ease; /* Add a transition effect */
    animation: 2.2s BendBottomLine;

    @keyframes BendBottomLine {
      from {
        border-bottom-left-radius: 0px 0px;
        border-bottom-left-radius: 0px 0px;
      }
      to {
        border-bottom-right-radius: 180px 180px;
        border-bottom-left-radius: 180px 180px;
      }
    }
  }
`;

//   return (
//     <header className="header flex section_padding">
//       <div className="presentation-container flex-column">
//         <h2>Apprendre la musique en ligne</h2>
//         <p>Apprenez l'instrument que vous avez toujours voulu savoir jouer sans bouger de chez vous !</p>
//         <button></button>
//       </div>
//       <div className="img-container">
//         <img src={trompette} alt="" />
//       </div>
//     </header>
//   );
// };

export default Header;

