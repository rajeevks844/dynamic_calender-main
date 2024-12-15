import React, { useState } from "react";
import { useEventContext } from "../context/EventContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Trash2, Edit2 } from "lucide-react";

export default function EventList({ events }) {
  const { deleteEvent, updateEvent } = useEventContext();
  const [editingEvent, setEditingEvent] = useState(null); // State for the event being edited
  const [editedEventDetails, setEditedEventDetails] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const getColorClass = (eventType) => {
    switch (eventType) {
      case "work":
        return { card: "bg-blue-100 text-blue-600", button: "bg-blue-600 text-white" };
      case "personal":
        return { card: "bg-red-100 text-red-600", button: "bg-red-600 text-white" };
      case "others":
        return { card: "bg-green-100 text-green-600", button: "bg-green-600 text-white" };
      default:
        return { card: "bg-white text-gray-600", button: "bg-gray-600 text-white" };
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent(event.id);
    setEditedEventDetails({
      name: event.name,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description,
    });
  };

  const handleSaveChanges = () => {
    updateEvent(editingEvent, editedEventDetails); // Call updateEvent function to save changes
    setEditingEvent(null); // Reset the editing state
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4 text-center">Events</h3>

      {events.length === 0 ? (
        <div className="flex flex-col items-center text-gray-600 p-4 border rounded-lg bg-gray-50">
          <AlertCircle className="text-gray-400 mb-2" size={32} />
          <p className="text-sm">No events scheduled for this day.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => {
            const { card, button } = getColorClass(event.eventType);

            return (
              <Card
                key={event.id}
                className={`p-4 flex justify-between items-center shadow-md hover:shadow-lg transition-shadow ${card}`}
              >
                {/* Event Details */}
                {editingEvent === event.id ? (
                  <div className="flex flex-col gap-4 w-full">
                    {/* Editable Form */}
                    <input
                      type="text"
                      value={editedEventDetails.name}
                      onChange={(e) => setEditedEventDetails({ ...editedEventDetails, name: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Event Name"
                    />
                    <div className="flex gap-4">
                      <input
                        type="time"
                        value={editedEventDetails.startTime}
                        onChange={(e) => setEditedEventDetails({ ...editedEventDetails, startTime: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                        placeholder="Start Time"
                      />
                      <input
                        type="time"
                        value={editedEventDetails.endTime}
                        onChange={(e) => setEditedEventDetails({ ...editedEventDetails, endTime: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                        placeholder="End Time"
                      />
                    </div>
                    <textarea
                      value={editedEventDetails.description}
                      onChange={(e) => setEditedEventDetails({ ...editedEventDetails, description: e.target.value })}
                      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={4}
                      placeholder="Event Description"
                    />
                    <div className="flex gap-4 mt-4">
                      <Button
                        className={`flex items-center gap-2 ${button}`}
                        onClick={handleSaveChanges}
                      >
                        Save Changes
                      </Button>
                      <Button
                        className="flex items-center gap-2 bg-gray-500 text-white"
                        onClick={() => setEditingEvent(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <h4 className="font-semibold text-lg">{event.name}</h4>
                    <p className="text-sm">{event.startTime} - {event.endTime}</p>
                    <p className="text-sm">{event.description}</p>
                  </div>
                )}

                {/* Delete Button */}
                <div className="flex items-center gap-2">
                  {!editingEvent && (
                    <Button
                      variant="destructive"
                      className={`flex items-center gap-2 ${button}`}
                      onClick={() => deleteEvent(event)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  )}
                  {/* Edit Button */}
                  {!editingEvent && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => handleEditClick(event)}
                    >
                      <Edit2 size={16} />
                      Edit
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </ul>
      )}
    </div>
  );
}
