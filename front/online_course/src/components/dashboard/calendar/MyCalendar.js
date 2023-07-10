import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import react, { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import ModalCalendar from "./modal_calendar/ModalCalendar";
import './mycalendar.css';
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";

export const MyCalendar = () => {


  /*
  
  Création événément ok.
  Modification événement, vérifier l'allongement de l'event lors d'un d'n'd : ok !

  Faire modal avec l'événement sélectionner pour pouvoir le modifier : ok !
  Gérer la nouvelle heure de l'event lors du drop 
  Définir les routes en back
  
  
  */ 

  const LESSON_URL = '/lesson'
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState({});
  const calendarRef = useRef();
  const [selectedEvent, setSelectedEvent] = useState(null)
  const { auth } = useAuth();

  console.log(auth.accessToken);

  const handleSelect = (info) => {
      setDate(info);
      setModal(true);
      // console.log(events)
  }
  // Gérer la politique des données essentielles et non essentielles lors du create

  const handleModalConfirm = async (instrument, topic, id) => {
    // console.log('handleModalConfirm active', "id ==>", id);
    // console.log(selectedEvent)
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
        
        setSelectedEvent(null);
      })
    //   // Mettre fonction post ici ? Récupérer l'id au niveau du back
    //   (async () => {
    //     try {
    //       const response = await axios.post(LESSON_URL, JSON.stringify({
    //           instrument: instrument,
    //           topic: topic
    //           }), {
    //             headers: {'Content-Type': 'application/json'},
    //             withCredentials: true
    //           });
    //           console.log(response.data);
    //           console.log(JSON.stringify(response));
    //     } catch (err) {
    //       if(!err?.response) {
    //           console.log('Err:', err);
    //       }
    //     }
    // })
    } else if (topic) {
      setEvents([
        ...events,
        {
          start : date.start,
          end : date.end,
          topic: topic,
          instrument : instrument,
          id: uuid(),
        },
      ])

    
        try {
          const response = await axios.post(LESSON_URL, JSON.stringify({
              instrument: instrument,
              topic: topic,
              startDate: date.start,
              endDate: date.end
              }), {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${auth.accessToken}`
              },

                withCredentials: true,
              });
              console.log(response.data);
              console.log(JSON.stringify(response));
        } catch (err) {
          if(!err?.response) {
              console.log('Err:', err);
          }
        }
        setModal(false);
    }
    
    
  };

  // console.log(events);

  const handleDateClick = (arg) => { // bind with an arrow function

    // console.log(calendarRef.current.getApi());
    // console.log(arg);
    }
 
    const handleEventClick = (event) => {
      setSelectedEvent(event.event);
      // console.log(event)
    }
  
  

    const handleResize = (info) => {
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
    const handleDrop = (info) => {
      console.log(info.event.start)
    }
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
        eventOverlap={false}
        weekends={false}
        // slotMinTime="8:00:00"
        // slotMaxTime="19:00:00"
        dateClick={handleDateClick}
        // Permet d'afficher les événements sur le
        // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        // eventClick={this.handleEventClick}
        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        // eventAdd={addEvent}
        //  ref={calendarRef}
        ref={calendarRef}
        eventResize={handleResize}
        eventDrop={handleDrop}
      />

      {modal && <ModalCalendar onConfirm={handleModalConfirm} closeModal={setModal} />}
      {selectedEvent && <ModalCalendar selectedEvent={selectedEvent} closeModal={setModal}  onConfirm={handleModalConfirm} /> }
    </div>
  );
};


export default MyCalendar ;