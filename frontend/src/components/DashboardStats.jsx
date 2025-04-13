import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  FileText,
  Activity,
  Heart,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  RefreshCw,
} from "lucide-react";

const DashboardStats = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Static data for stats
  const statsData = [
    {
      title: "Upcoming Appointments",
      value: "3",
      icon: Calendar,
      color: "blue",
      trend: "+2",
      trendUp: true,
    },
    {
      title: "Completed Appointments",
      value: "12",
      icon: Clock,
      color: "green",
      trend: "+5",
      trendUp: true,
    },
    {
      title: "Doctors Consulted",
      value: "8",
      icon: User,
      color: "purple",
      trend: "+1",
      trendUp: true,
    },
    {
      title: "Medical Records",
      value: "15",
      icon: FileText,
      color: "orange",
      trend: "-2",
      trendUp: false,
    },
  ];

  // Static data for health metrics
  const healthMetricsData = [
    {
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      icon: Activity,
      color: "blue",
      status: "Normal",
    },
    {
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      icon: Heart,
      color: "red",
      status: "Normal",
    },
    {
      title: "BMI",
      value: "24.5",
      unit: "kg/m²",
      icon: TrendingUp,
      color: "green",
      status: "Healthy",
    },
  ];

  const [stats, setStats] = useState(statsData);
  const [healthMetrics, setHealthMetrics] = useState(healthMetricsData);

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
      },
      orange: {
        bg: "bg-orange-50",
        text: "text-orange-600",
      },
      red: {
        bg: "bg-red-50",
        text: "text-red-600",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      setStats(statsData);
      setHealthMetrics(healthMetricsData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats &&
          stats.map((stat, index) => {
            const colorClasses = getColorClasses(stat.color);
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
                    <stat.icon className={colorClasses.text} size={24} />
                  </div>
                  <div
                    className={`flex items-center ${
                      stat.trendUp ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trendUp ? (
                      <ArrowUp size={16} />
                    ) : (
                      <ArrowDown size={16} />
                    )}
                    <span className="text-sm font-medium">{stat.trend}</span>
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            );
          })}
      </div>

      {/* Health Metrics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Health Metrics</h2>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`text-gray-600 ${isLoading ? "animate-spin" : ""}`}
              size={20}
            />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthMetrics &&
            healthMetrics.map((metric, index) => {
              const colorClasses = getColorClasses(metric.color);
              return (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                      <metric.icon className={colorClasses.text} size={20} />
                    </div>
                    <h3 className="text-gray-700 font-medium">
                      {metric.title}
                    </h3>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-gray-800">
                      {metric.value}
                    </p>
                    <span className="text-gray-500">{metric.unit}</span>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        metric.status === "Normal" ||
                        metric.status === "Healthy"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {metric.status}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
