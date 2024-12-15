import React, { useState } from "react";
import { useEventContext } from "../context/EventContext";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea"; 
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; 
import { Calendar, Clock, Briefcase, Heart, CalendarPlus } from "lucide-react"; // Icons

export default function Modal({ selectedDay }) {
  const { addEvent } = useEventContext();
  const [isOpen, setIsOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
    eventType: "", 
  });

  const handleSubmit = () => {
    if (!eventDetails.name || !eventDetails.startTime || !eventDetails.endTime || !eventDetails.eventType) {
      alert("Please fill out all required fields.");
      return;
    }
    addEvent({ ...eventDetails, date: selectedDay });
    setEventDetails({ name: "", startTime: "", endTime: "", description: "", eventType: "" });
    setIsOpen(false);
  };

  // Handle icon selection
  const handleIconSelect = (type) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      eventType: type,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button to Open Modal */}
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">
          Add Event
        </Button>
      </DialogTrigger>

      {/* Modal Dialog */}
      <DialogContent className="max-w-md p-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Add Event</DialogTitle>
        </DialogHeader>

        {/* Event Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Name</label>
          <Input
            className="mt-2"
            placeholder="Event Name"
            value={eventDetails.name}
            onChange={(e) =>
              setEventDetails({ ...eventDetails, name: e.target.value })
            }
          />
        </div>

        {/* Start Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <div className="relative mt-2">
            <Input
              type="time"
              value={eventDetails.startTime}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, startTime: e.target.value })
              }
              className="pl-10"
            />
            <Calendar className="absolute left-3 top-2 text-gray-400" />
          </div>
        </div>

        {/* End Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <div className="relative mt-2">
            <Input
              type="time"
              value={eventDetails.endTime}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, endTime: e.target.value })
              }
              className="pl-10"
            />
            <Clock className="absolute left-3 top-2 text-gray-400" />
          </div>
        </div>

        {/* Event Description Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
          <Textarea
            className="mt-2"
            placeholder="Event Description"
            value={eventDetails.description}
            onChange={(e) =>
              setEventDetails({ ...eventDetails, description: e.target.value })
            }
          />
        </div>

        {/* Event Type Selectable Icons */}
        <div className="flex justify-between mt-4">
          <div
            className={`cursor-pointer flex items-center space-x-2 p-2 rounded-lg transition-all ${eventDetails.eventType === "work" ? "bg-blue-100" : "bg-white"}`}
            onClick={() => handleIconSelect("work")}
          >
            <Briefcase className={`w-6 h-6 ${eventDetails.eventType === "work" ? "text-blue-600" : "text-gray-600"}`} />
            <span className={eventDetails.eventType === "work" ? "text-blue-600" : "text-gray-600"}>Work</span>
          </div>

          <div
            className={`cursor-pointer flex items-center space-x-2 p-2 rounded-lg transition-all ${eventDetails.eventType === "personal" ? "bg-red-100" : "bg-white"}`}
            onClick={() => handleIconSelect("personal")}
          >
            <Heart className={`w-6 h-6 ${eventDetails.eventType === "personal" ? "text-red-600" : "text-gray-600"}`} />
            <span className={eventDetails.eventType === "personal" ? "text-red-600" : "text-gray-600"}>Personal</span>
          </div>

          <div
            className={`cursor-pointer flex items-center space-x-2 p-2 rounded-lg transition-all ${eventDetails.eventType === "others" ? "bg-green-100" : "bg-white"}`}
            onClick={() => handleIconSelect("others")}
          >
            <CalendarPlus className={`w-6 h-6 ${eventDetails.eventType === "others" ? "text-green-600" : "text-gray-600"}`} />
            <span className={eventDetails.eventType === "others" ? "text-green-600" : "text-gray-600"}>Others</span>
          </div>
        </div>

        {/* Dialog Footer with Action Buttons */}
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-600 text-white" onClick={handleSubmit}>
            Save Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
