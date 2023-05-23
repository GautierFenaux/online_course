import React, { useState } from "react";
import "./subForm.css";

export const Level = (props) => {
  const [formData, setFormData] = useState({
    level: "non-renseigné",
  });
  const preventFunc = (e) => e.preventDefault();

  const handleRadio = (e) => {
    setFormData({
      level: e.target.value,
    });
  };
  const handleReturn = () => {
    props.modifyIndex(1);
  };

  return (
    <form className="checkbox-form flex-column " onSubmit={preventFunc}>
      <p>Sélectionner votre niveau :</p>
      <div className="radio-container ">
        
        <input
          name="level"
          type="radio"
          id="beginner"
          value="débutant"
          onChange={handleRadio}
        />
        <label htmlFor="beginner">Débutant</label>
      </div>

      <div className="radio-container ">
        
        <input
          name="level"
          type="radio"
          id="intermediate"
          value="intermédiaire"
          onChange={handleRadio}
        />
        <label htmlFor="intermediate">Intermédiaire</label>
      </div>
      <div className="radio-container ">
        
        <input
          name="level"
          type="radio"
          id="confirmed"
          value="confirmé"
          onChange={handleRadio}
        />
        <label htmlFor="confirmed">Confirmé</label>
      </div>
      <div className="radio-container ">
        
        <input
          name="level"
          type="radio"
          id="expert"
          value="expert"
          onChange={handleRadio}
          
        />
        <label htmlFor="expert">Expert</label>
      </div>
      <div className="container-btns">
        <button type="button" className="prev" onClick={handleReturn}>
          Précédent
        </button>
        <button onClick={() => props.modifyIndex(3, formData)}>Valider</button>
      </div>
    </form>
  );
};

export default Level;
