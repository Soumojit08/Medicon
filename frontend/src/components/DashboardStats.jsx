import React from "react";
import { motion } from "framer-motion";

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        whileHover={{ scale: 1.1 }}
      >
        <h3 className="text-gray-600">Upcoming Appointments</h3>
        <div className="text-2xl font-bold">3</div>
      </motion.div>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        whileHover={{ scale: 1.1 }}
      >
        <h3 className="text-gray-600">Completed Visits</h3>
        <div className="text-2xl font-bold">12</div>
      </motion.div>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        whileHover={{ scale: 1.1 }}
      >
        <h3 className="text-gray-600">Medical Records</h3>
        <div className="text-2xl font-bold">5</div>
      </motion.div>
    </div>
  );
};

export default DashboardStats;
