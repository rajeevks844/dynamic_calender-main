import React, { useState, useContext } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  addYears,
  subYears,
  isSameMonth,
  isToday,
} from "date-fns";
import { Card } from "@/components/ui/card"; // shadcn Card component
import { Button } from "@/components/ui/button"; 
import { Download, Calendar } from "lucide-react";
import { useEventContext } from "../context/EventContext";
import { cn } from "@/lib/utils"; // Conditional class utility
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react"; // Icons

export default function CalendarGrid({ selectedDay, setSelectedDay }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const month = currentMonth.getMonth(); // Current month (0-11)
  const year = currentMonth.getFullYear(); // Current year
  const { getEventsOfMonth } = useEventContext();
  // Calculate the calendar grid range
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const startCalendar = startOfWeek(firstDayOfMonth); // Start from the Sunday before the 1st
  const endCalendar = endOfWeek(lastDayOfMonth); // End on the Saturday after the last day

  const days = eachDayOfInterval({
    start: startCalendar,
    end: endCalendar,
  });

  // Handlers for navigation
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToPreviousYear = () => setCurrentMonth(subYears(currentMonth, 1));
  const goToNextYear = () => setCurrentMonth(addYears(currentMonth, 1));

  const exportToJSON = () => {
    // Get the events for the current month
    const eventsForMonth = getEventsOfMonth(currentMonth.getMonth(), currentMonth.getFullYear());

    // Convert events to JSON and trigger download
    const dataStr = JSON.stringify(eventsForMonth, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "events.json";
    link.click();
  };

  return (
    <div className="text-center">
      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mb-6">
        {/* Year Navigation */}
        <button
          onClick={goToPreviousYear}
          className="text-xl p-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={32} />
        </button>
        {/* Month Navigation */}
        <button
          onClick={goToPreviousMonth}
          className="text-lg p-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft size={24} />
        </button>
        {/* Current Month and Year */}
        <h2 className="text-2xl font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        {/* Month Navigation */}
        <button
          onClick={goToNextMonth}
          className="text-lg p-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronRight size={24} />
        </button>
        {/* Year Navigation */}
        <button
          onClick={goToNextYear}
          className="text-xl p-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowRight size={32} />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-sm font-medium text-gray-500 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <Card
            key={day.toISOString()}
            className={cn(
              "p-4 text-center cursor-pointer transition-colors duration-150",
              isSameMonth(day, currentMonth)
                ? "bg-gray-50 hover:bg-gray-100"
                : "bg-gray-200 text-gray-400",
              isToday(day) && "border-2 border-blue-600 bg-blue-200",  // Make today stand out with blue border and background
              format(day, "yyyy-MM-dd") ===
                format(selectedDay, "yyyy-MM-dd") && "bg-blue-500 text-white hover:text-blue-500",
              (index % 7 === 0) && "mr-4",  // Add margin to Sunday (index 0) and Saturday (index 6)
              (index % 7 === 6) && "ml-4"
            )}
            onClick={() => setSelectedDay(day)}
          >
            {format(day, "d")}
          </Card>
        ))}
      </div>
      <Button
        className="mt-4 bg-blue-600 text-white flex items-center gap-2"
        onClick={exportToJSON}
      >
        <Download size={16} />
        Download Events as JSON
      </Button>
    </div>
  );
}
