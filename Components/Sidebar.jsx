import React from "react";
import { useEventContext } from "../context/EventContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Sidebar() {
  const { events } = useEventContext(); // Assuming you have a list of events for the month

  // Filter events for the current month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const eventsForMonth = events.filter(
    (event) =>
      new Date(event.startTime).getMonth() === currentMonth &&
      new Date(event.startTime).getFullYear() === currentYear
  );

  // Convert events to JSON and trigger download
  const exportToJSON = () => {
    const dataStr = JSON.stringify(eventsForMonth, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "events.json";
    link.click();
  };

  return (
    <div className="w-80 p-4 bg-gray-100 shadow-md h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Events for this Month</h2>

      <ScrollArea className="space-y-4 flex-grow">
        {eventsForMonth.length === 0 ? (
          <Card className="text-center p-4 bg-gray-200 text-gray-600">
            <Calendar size={20} className="mx-auto mb-2" />
            <p>No events scheduled for this month.</p>
          </Card>
        ) : (
          eventsForMonth.map((event) => (
            <Card key={event.id} className="p-4 shadow-sm">
              <h4 className="font-semibold text-lg">{event.name}</h4>
              <p className="text-sm text-gray-500">
                {new Date(event.startTime).toLocaleDateString()} - {new Date(event.endTime).toLocaleTimeString()}
              </p>
            </Card>
          ))
        )}
      </ScrollArea>

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
