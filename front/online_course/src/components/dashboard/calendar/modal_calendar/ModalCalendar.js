import React, { useState } from "react";

const ModalCalendar = ({ onConfirm, closeModal}) => {
  
    const [instrument, setInstrument] = useState("");
    const [topic, setTopic] = useState("");

    const handleConfirm = () => {
      // Pass the input values to the onConfirm callback
      onConfirm(instrument, topic);
      closeModal(false);
    };

    return (
      <div className="custom-prompt">
        <input
          type="text"
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
          placeholder="Entrer l'instrument"
        />
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Entrer le sujet"
        />
        <button onClick={handleConfirm}>Valider</button>
      </div>
    );
  };


export default ModalCalendar;
