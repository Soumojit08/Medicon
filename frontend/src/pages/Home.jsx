import React from "react";
import HomeSearch from "../components/HomeSearch";
import { Heart, Calendar, Video, Clock, Star, Shield } from "lucide-react";
import RotatingText from "../components/RotatingText";

const Home = () => {
  const features = [
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Quality Healthcare",
      description:
        "Connect with verified and experienced healthcare professionals",
    },
    {
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      title: "Easy Scheduling",
      description: "Book appointments instantly at your convenience",
    },
    {
      icon: <Video className="h-6 w-6 text-green-500" />,
      title: "Video Consultations",
      description: "Get expert medical advice from the comfort of your home",
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      title: "24/7 Availability",
      description: "Access healthcare services anytime, anywhere",
    },
  ];

  const stats = [
    { number: "1000+", label: "Verified Doctors" },
    { number: "50,000+", label: "Happy Patients" },
    { number: "100%", label: "Secure Platform" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <HomeSearch />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center space-x-2">
            <span>Why Choose</span>
            <span>
              <RotatingText
                texts={["Care?", "MEDICON?"]}
                mainClassName="inline-block px-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-1 rounded-lg shadow-md"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 40, stiffness: 200 }}
                rotationInterval={2000}
              />
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-2 text-gray-600">
              <Shield className="h-6 w-6 text-green-500" />
              <span>Verified Doctors</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Star className="h-6 w-6 text-yellow-500" />
              <span>Rated 4.8/5 by our users</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Heart className="h-6 w-6 text-red-500" />
              <span>Trusted by 50,000+ patients</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
