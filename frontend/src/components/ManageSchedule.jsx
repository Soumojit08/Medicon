// src/components/ManageSchedule.jsx
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";

const ManageSchedule = (doctorId) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctortoken")
  );
  const [schedules, setSchedules] = useState(
    days.map((day) => ({
      day,
      enabled: true,
      slots: [{ start: "09:00", end: "17:00" }],
    }))
  );

  const addTimeSlot = (day) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.day === day
          ? {
              ...schedule,
              slots: [...schedule.slots, { start: "09:00", end: "17:00" }],
            }
          : schedule
      )
    );
  };

  const removeTimeSlot = (day, index) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.day === day
          ? {
              ...schedule,
              slots: schedule.slots.filter((_, i) => i !== index),
            }
          : schedule
      )
    );
  };

  useEffect(() => {
    if (doctorId) {
      getSchedule(doctorId);
    }
  }, []);

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/updateSchedule",
        { schedules },
        {
          headers: {
            Authorization: `Bearer ${doctorToken}`,
          },
        }
      );
      const data = response.data;
      console.log(data); //API RESPONSE
      toast.success("Schedule Updated Successfully");
    } catch (error) {
      console.error(error);
      console.log("failed to update schedule");
    }
  };

  const getSchedule = async (doctorId) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/getSchedule/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${doctorToken}`,
          },
        }
      );

      const data = response.data;
    } catch (error) {
      console.log("Error get schedule : ", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-blue-500">
          Manage Weekly Schedule
        </h3>
      </div>
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.day} className="bg-zinc-100 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-800 font-medium">{schedule.day}</p>
              {/* Slider Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={schedule.enabled}
                  onChange={(e) =>
                    setSchedules((prev) =>
                      prev.map((s) =>
                        s.day === schedule.day
                          ? { ...s, enabled: e.target.checked }
                          : s
                      )
                    )
                  }
                  className="sr-only peer" // Hide the default checkbox
                />
                <div
                  className={`w-11 h-6 rounded-full transition-colors ${
                    schedule.enabled ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-0.6 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      schedule.enabled ? "translate-x-5.5" : "translate-x-0.5"
                    }`}
                  ></div>
                </div>
              </label>
            </div>
            <div className="space-y-2">
              {schedule.slots.map((slot, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="time"
                      value={slot.start}
                      onChange={(e) =>
                        setSchedules((prev) =>
                          prev.map((s) =>
                            s.day === schedule.day
                              ? {
                                  ...s,
                                  slots: s.slots.map((sl, i) =>
                                    i === index
                                      ? { ...sl, start: e.target.value }
                                      : sl
                                  ),
                                }
                              : s
                          )
                        )
                      }
                      className="p-2 border border-gray-300 rounded-lg"
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={slot.end}
                      onChange={(e) =>
                        setSchedules((prev) =>
                          prev.map((s) =>
                            s.day === schedule.day
                              ? {
                                  ...s,
                                  slots: s.slots.map((sl, i) =>
                                    i === index
                                      ? { ...sl, end: e.target.value }
                                      : sl
                                  ),
                                }
                              : s
                          )
                        )
                      }
                      className="p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button
                    onClick={() => removeTimeSlot(schedule.day, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              ))}
              <div>
                <button
                  onClick={() => addTimeSlot(schedule.day)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  + Add Slot
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSave}
          className="flex-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ManageSchedule;