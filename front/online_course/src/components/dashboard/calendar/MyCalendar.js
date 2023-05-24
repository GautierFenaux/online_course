import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import react, { useState } from "react";
import { v4 as uuid } from "uuid";
import ModalCalendar from "./modal_calendar/ModalCalendar";
import './mycalendar.css';


export const MyCalendar = () => {

  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);

  const handleModalConfirm = (instrument, topic) => {
    // Return an object with the instrument and topic values
    return {
      instrument,
      topic,
    };
  };

  const handleSelect = async (info) => {
    const { start, end } = info;
    console.log(start, end);
    // Open the modal and wait for the confirmation
    setModal(true);
    const eventData = await new Promise((resolve) => {
      // Define a callback function that will receive the confirmation data
      const handleConfirmation = (instrument, topic) => {
        resolve({ start, end, instrument, topic });
      };
      // Pass the handleConfirmation function to the modal component
      // so that it can call it when the user confirms
      <ModalCalendar onConfirm={handleConfirmation} />;
    });
    console.log(eventData);
    if (eventData) {
      setEvents([
        ...events,
        {
          start : eventData.start,
          end : eventData.end,
          title: eventData.topic,
          id: uuid(),
        },
      ]);
    }
  };

  // console.log(events, modal);

  return (
    <div className="calendar-container">
      <FullCalendar  editable
        selectable
        events={events}
        select={handleSelect}
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        plugins={[ daygridPlugin, timeGridPlugin, interactionPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        initialView='timeGridDay'
        selectMirror={true}
        dayMaxEvents={true}
        weekends={false}
        // Permet d'afficher les événements sur le
        // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        // eventClick={this.handleEventClick}
        // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
        // eventAdd={addEvent}
      />

      {modal && <ModalCalendar onConfirm={handleModalConfirm} closeModal={setModal}/>}
    </div>
  );
};


export default MyCalendar ;