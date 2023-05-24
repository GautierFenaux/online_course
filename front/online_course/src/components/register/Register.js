import { React, useState } from "react";
import Level from "./sub_register/Level";
import Styles from "./sub_register/Styles";
import Indicator from "./indicator/Indicator";
import Informations from "./sub_register/Informations";
import ValidationStep from "./sub_register/ValidationStep";
import singleNote from "../../assets/single_note.png";
import "./register.css";

export default function Register() {
  const [formIndex, setFormIndex] = useState(1);
  const [allFormData, setAllFormData] = useState({
    level: "",
    styles: [],
    informations: {},
  });

  const modifyIndex = (index, data) => {
    setFormIndex(index);

    // Ajout des données dynamique
    if (data) {
      // copie de l'objet allFormData
      const newData = { ...allFormData };
      // Récupération de la props venant du composant d'où vient la donnée via Object et data
      // renvoie les données sous forme de tableau et 0 correspond à dietForm
      const firstPropNewData = Object.keys(data)[0];
      // Réinitialisation du tableau de données
      // Pour le composant DietForm.js
      // newData[dietForm] = data[dietForm]
      newData[firstPropNewData] = data[firstPropNewData];
      setAllFormData(newData);
    }
  };

  const elements = [
    <Informations modifyIndex={modifyIndex} />,
    <Level modifyIndex={modifyIndex} />,
    <Styles modifyIndex={modifyIndex} />,
    <ValidationStep data={allFormData} />,
  ];

  return (
    <div className="wrapper-form">
      <div className="container-multiform">
        <Indicator formIndex={formIndex} />

        {elements.map((item, index) => {
          if (index + 1 === formIndex) {
            return elements[index];
          }
          return "";
        })}
      </div>
      {/* <div class="note">
          <div className="note-container">
            <img alt="single note" src={singleNote} />
          </div>
          <div className="note-container">
            <img alt="single note" src={singleNote} />
          </div>
          <div className="note-container">
            <img alt="single note" src={singleNote} />
          </div>
          <div className="note-container">
            <img alt="single note" src={singleNote} />
          </div>
          <div className="note-container">
            <img alt="single note" src={singleNote} />
          </div>
          <div className="note-container">
            <img alt="single note" src={singleNote} />
          </div>
          <div className="note-container">
            <img alt="single note" src={singleNote} />
          </div>
      </div> */}
    </div>
  );
}
