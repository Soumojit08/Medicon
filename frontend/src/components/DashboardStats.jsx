import React from "react";
import { motion } from "framer-motion";

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <motion.div
        className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex justify-between items-center"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-gray-600 text-sm sm:text-base">Upcoming Appointments</h3>
        <div className="text-xl sm:text-2xl font-bold">3</div>
      </motion.div>
      <motion.div
        className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex justify-between items-center"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-gray-600 text-sm sm:text-base">Completed Visits</h3>
        <div className="text-xl sm:text-2xl font-bold">12</div>
      </motion.div>
      <motion.div
        className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex justify-between items-center"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-gray-600 text-sm sm:text-base">Medical Records</h3>
        <div className="text-xl sm:text-2xl font-bold">5</div>
      </motion.div>
    </div>
  );
};

export default DashboardStats;