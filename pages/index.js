import React, { useState } from "react";
import { format } from "date-fns";
import CalendarGrid from "../Components/CalendarGrid";
import EventList from "../Components/EventList";
import Modal from "../Components/Modal";
import { useEventContext } from "../context/EventContext";
import { Button } from "@/components/ui/button"; 


export default function Home() {
  
  const [selectedDay, setSelectedDay] = useState(new Date());
  const { events } = useEventContext();

  const eventsForSelectedDay = events.filter(
    (event) =>
      new Date(event.date).toDateString() === selectedDay.toDateString()
  );

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  // Format the current month and year
  const currentMonth = format(selectedDay, "MMMM yyyy");
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        {greeting}, Sir/Mam
      </h1>

      {/* Current Month
      <h2 className="text-xl font-semibold text-center mb-6">
        {currentMonth}
      </h2> */}

      {/* Calendar */}
      <CalendarGrid
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />


      <EventList events={eventsForSelectedDay} />

      {/* Modal for Adding/Editing Events */}
      <Modal selectedDay={selectedDay} />

      
    </div>
  );
}
