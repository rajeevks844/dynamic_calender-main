import React, { createContext, useState, useContext } from "react";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  const addEvent = (newEvent) => {
    const { startTime, endTime, date } = newEvent;

    const eventStart = startTime;
    const eventEnd = endTime;
    
    // Validate that start time is before end time
    if (eventStart >= eventEnd) {
      alert("The start time must be before the end time.");
      return;
    }

    // Check if the event overlaps with existing events
    const isOverlapping = events.some((event) => {
      if (event.date.toISOString().split('T')[0] === newEvent.date.toISOString().split('T')[0]) {
        return !((eventEnd <= event.startTime || eventStart >= event.endTime)); // Overlap condition
      }
    });

    if (isOverlapping) {
      alert("This event overlaps with an existing event. Please choose a different time.");
      return;
    }

    // Generate unique ID for the new event (based on the largest current ID + 1)
    const newId = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;

    // Add event with generated ID if no overlap and startTime < endTime
    const eventWithId = { ...newEvent, id: newId };
    setEvents((prev) => [...prev, eventWithId]);
  };

  const updateEvent = (eventId, updatedEvent) => {
    const { startTime, endTime, date } = updatedEvent;

    const eventStart = startTime;
    const eventEnd = endTime;
    
    // Validate that start time is before end time
    if (eventStart >= eventEnd) {
      alert("The start time must be before the end time.");
      return;
    }

    // Check if the updated event overlaps with any existing event
    const isOverlapping = events.some((event) => {
      if (event.id !== eventId && event.date.toISOString().split('T')[0] === updatedEvent.date.toISOString().split('T')[0]) {
        return !((eventEnd <= event.startTime || eventStart >= event.endTime)); // Overlap condition
      }
    });

    if (isOverlapping) {
      alert("This event overlaps with an existing event. Please choose a different time.");
      return;
    }

    // Update the event if no overlap and startTime < endTime
    setEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, ...updatedEvent } : event))
    );
  };

  const deleteEvent = (Event) => {
    setEvents((prev) => prev.filter((event) => Event !== event));
  };

  const getEventsOfMonth = (Month, Year) => {
    console.log(Month);
    console.log(Year);
    events.map((event) => {
      console.log(event.date.getMonth());
      console.log(event.date.getFullYear());
    });
    const eventsOfTheMonth = events.filter(
      (event) => Month === event.date.getMonth() && Year === event.date.getFullYear()
    );
    return eventsOfTheMonth;
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, getEventsOfMonth }}>
      {children}
    </EventContext.Provider>
  );
}

export const useEventContext = () => useContext(EventContext);
