import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import react, { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import ModalCalendar from "./modal_calendar/ModalCalendar";
import './mycalendar.css';


export const MyCalendar = () => {


  /*
  
  Création événément ok.
  Modification événement, vérifier l'allongement de l'event lors d'un d'n'd : ok !

  Faire modal avec l'événement sélectionner pour pouvoir le modifier
  
  
  */ 


  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState({});
  const calendarRef = useRef();
  const [selectedEvent, setSelectedEvent] = useState(null)


  const handleSelect = (info) => {
      setDate(info);
      setModal(true);
      // console.log(events)
  }

  const handleModalConfirm = (instrument, topic, id) => {

    if(id) {
      events.map((lesson, i) => { 
        if (lesson.id === id) {
          let updatedEvents = [...events]; // Make a copy of the events array
          updatedEvents[i] = {
            ...lesson, // Copy the original lesson
            topic: topic,
            instrument: instrument 
          };
          setEvents(updatedEvents); // Update the events state with the modified array
        }
      })
      // Mettre fonction post ici ? Récupérer l'id au niveau du back
    } else if (topic) {
      setEvents([
        ...events,
        {
          start : date.start,
          end : date.end,
          title: topic,
          instrument : instrument,
          id: uuid(),
        },
      ]);
    }

    setModal(false);
  };

  // console.log(events);

  const handleDateClick = (arg) => { // bind with an arrow function

    console.log(calendarRef.current.getApi());
    // console.log(arg);
    }
 
    const handleEventClick = (event) => {
      setSelectedEvent(event.event);
      // console.log(event)
    }
  
  

    const handleDrop = (info) => {
      // Récupérer l'event qui a cet id dans le tableau des event et le modifier
      // console.log('infoEventEnd : ',info.event.end);

      
      // console.log('events before Resize : ', events)

      events.map((lesson, i) => { 
        if (lesson.id === info.event.id) {
          let updatedEvents = [...events]; // Make a copy of the events array
          updatedEvents[i] = {
            ...lesson, // Copy the original lesson
            end: info.event.end // Update the end time
          };
          setEvents(updatedEvents); // Update the events state with the modified array
        }
      })
      
      // console.log('events After Resize : ', events)

    }
    // console.log('events After Resize : ', events)
  return (
    <div className="calendar-container">
      <FullCalendar  
       editable
       selectable
        events={events}
        // Trouver un moyen d'ouvrir la modale, permet d'obtenir les info startDate et endDate au clique
        select={handleSelect}
        eventClick={handleEventClick}
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
        // slotMinTime="8:00:00"
        // slotMaxTime="23:00:00"
        dateClick={handleDateClick}
        // Permet d'afficher les événements sur le
        // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        // eventClick={this.handleEventClick}
        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        // eventAdd={addEvent}
        //  ref={calendarRef}
        ref={calendarRef}
        eventResize={handleDrop}
      />

      {modal && <ModalCalendar onConfirm={handleModalConfirm} closeModal={setModal} />}
      {selectedEvent && <ModalCalendar selectedEvent={selectedEvent} onConfirm={handleModalConfirm} closeModal={setModal} setEventToNull={() => setSelectedEvent(null)} /> }
    </div>
  );
};


export default MyCalendar ;