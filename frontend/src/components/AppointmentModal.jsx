// src/components/AppointmentModal.jsx
import React, { useState, useEffect } from "react";

const AppointmentModal = ({ isOpen, onClose, doctorId, onSubmit }) => {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  // Simulate fetching time slots based on the selected date
  useEffect(() => {
    if (date) {
      // Dummy time slots for demonstration
      const slots = [
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "2:00 PM - 3:00 PM",
      ];
      setTimeSlots(slots);
    } else {
      setTimeSlots([]);
    }
  }, [date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ doctorId, date, timeSlot });
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Book Appointment</h2>
          <button onClick={onClose} className="text-text-secondary">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-text-secondary">Date</label>
            <input
              type="date"
              className="w-full p-2 border border-border-color rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-text-secondary">
              Time Slot
            </label>
            <select
              className="w-full p-2 border border-border-color rounded-md"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
