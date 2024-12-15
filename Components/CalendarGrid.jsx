/* Debugging dynamic calendar application */

// Example issues to address in the files:
// 1. Syntax errors in JavaScript/React components
// 2. Missing or incorrect imports
// 3. Unhandled errors in API or utility functions

// --------------- Loaded File: CalendarGrid.jsx ----------------
export default function CalendarGrid({ dates, events }) {
  return (
      <div className="grid grid-cols-7 gap-1">
          {dates.map((date, idx) => (
              <div key={idx} className="p-2 border rounded">
                  {date}
                  {events[date] && (
                      <ul>
                          {events[date].map((event, eventIdx) => (
                              <li key={eventIdx}>{event.name}</li>
                          ))}
                      </ul>
                  )}
              </div>
          ))}
      </div>
  );
}

// --------------- Loaded File: Modal.jsx ----------------
import React, { useState } from "react";

export default function Modal({ isOpen, onClose, onSubmit }) {
  const [eventName, setEventName] = useState("");

  if (!isOpen) return null;

  return (
      <div className="modal">
          <div className="modal-content">
              <span className="close" onClick={onClose}>
                  &times;
              </span>
              <form
                  onSubmit={(e) => {
                      e.preventDefault();
                      onSubmit(eventName);
                      setEventName("");
                  }}
              >
                  <input
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      placeholder="Enter event name"
                  />
                  <button type="submit">Submit</button>
              </form>
          </div>
      </div>
  );
}

// Note: Similar checks for all files will involve ensuring correct prop passing, responsive behavior, and functional API interactions.
// Let me know how you'd like to proceed!
