import React, { useState, useEffect } from "react";

const ModalCalendar = ({ onConfirm, closeModal, selectedEvent }) => {
  const [instrument, setInstrument] = useState("");
  const [topic, setTopic] = useState("");
  let start;
  let id;
  if (selectedEvent) {
    console.log(selectedEvent._def.publicId);
    console.log(selectedEvent._def.extendedProps.instrument)
  }


  useEffect(() => {
    if (selectedEvent) {
      setInstrument(selectedEvent._def.extendedProps?.instrument);
      id = selectedEvent._def.publicId;
      start = selectedEvent._instance.range.start.toString();
      console.log(instrument)
    }
  }, [selectedEvent]);




  const handleConfirm = () => {
    // Pass the input values to the onConfirm callback
    onConfirm(instrument, topic, id);
    closeModal(false);
  };
  // Afficher l'instrument correpondant à l'événement tout en pouvant le modifier

  return (
    <div className="custom-prompt">
      {selectedEvent ? (
        <div>
          <p> Modification de la lesson du : {start} </p>
          <label for="instrument">Instrument</label>
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
