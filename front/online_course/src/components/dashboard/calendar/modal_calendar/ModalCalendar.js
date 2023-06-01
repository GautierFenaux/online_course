import React, { useState, useEffect } from "react";

const ModalCalendar = ({ onConfirm, closeModal, selectedEvent }) => {
  const [instrument, setInstrument] = useState("");
  const [topic, setTopic] = useState("");
  const [id, setId] = useState("");
  const [start, setStart] = useState("");

  
  if (selectedEvent) {
    console.log(selectedEvent);
    console.log(selectedEvent._def.extendedProps.instrument)
  }


  useEffect(() => {
    if (selectedEvent) {
      setInstrument(selectedEvent._def.extendedProps?.instrument);
      setId(selectedEvent._def.publicId);
      setStart(selectedEvent._instance.range.start.toString());
    }
  }, [selectedEvent]);




  const handleConfirm = () => {
    // Pass the input values to the onConfirm callback
    console.log('je suis là');
    onConfirm(instrument, topic, id);
    closeModal(false);
  };
  // Afficher l'instrument correpondant à l'événement tout en pouvant le modifier
  // Eviter le chevauchement lors de la modification de l'événement supprimer l'événement modifié visuellement si valider
  return (
    <div className="custom-prompt">
      {selectedEvent ? (
        <div>
          <p> Modification de la lesson du : {start} </p>
          <label htmlFor="instrument">Instrument</label>
          <input
            type="text"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            placeholder="Entrer l'instrument"
            name="instrument"
          />
          
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Entrer le sujet"
          />
          <button onClick={handleConfirm}> Valider </button>
        </div>
      ) : (
        <div>
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
          <button onClick={handleConfirm}> Valider </button>
        </div>
      )}
    </div>
  );
};

export default ModalCalendar;
