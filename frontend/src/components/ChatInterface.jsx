import React from "react";
import HomeSearch from "../components/HomeSearch";
import { Heart, Calendar, Video, Clock, Star, Shield } from "lucide-react";
import RotatingText from "../components/RotatingText";
import Footer from "../components/Footer";
import ChatInterface from "../components/ChatInterface";
import { ReviewCard, Marquee } from "../components/Marque";
import { motion } from "framer-motion"; // Framer Motion import

// Define a high-impact motion variant that combines sliding, scaling, and rotation
const highMotionVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.8, rotate: 3 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

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

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 5,
      review: "Amazing service and quality!",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 4,
      review: "Good experience, but could be better.",
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      rating: 5,
      review: "Absolutely loved the product!",
    },
    {
      id: 4,
      name: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      rating: 4,
      review: "Great quality, would buy again.",
    },
    {
      id: 5,
      name: "Olivia Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
      rating: 5,
      review: "Best purchase I've made this year!",
    },
    {
      id: 6,
      name: "Liam Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liam",
      rating: 3,
      review: "Decent product, met my expectations.",
    },
    {
      id: 7,
      name: "Sophia Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
      rating: 5,
      review: "Superb! Highly recommended.",
    },
    {
      id: 8,
      name: "William Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=william",
      rating: 4,
      review: "Very satisfied with my order.",
    },
    {
      id: 9,
      name: "Isabella Moore",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=isabella",
      rating: 5,
      review: "Loved it! Will buy again.",
    },
    {
      id: 10,
      name: "Ethan White",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ethan",
      rating: 4,
      review: "Good service and fast delivery.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <HomeSearch />
      <ChatInterface />

      {/* Features Section with high-impact left sliding (plus scale and slight rotation) */}
      <motion.section
        variants={highMotionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }} // triggers each time the section enters view
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center space-x-2">
            <span>Why Choose</span>
            <span>
              <RotatingText
                texts={["MEDICON?", "Relieves?", "Thrives?", "Support?"]}
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
              <motion.div
                key={index}
                variants={highMotionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section with high-impact bottom sliding (plus scale and rotation) */}
      <motion.section
        variants={highMotionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={highMotionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Review Section with high-impact right sliding (plus scale and rotation) */}
      <motion.section
        variants={highMotionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        className="flex flex-col items-center justify-center py-16 bg-white px-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          What Our Customers Say
        </h2>
        <Marquee direction="left" speed={30} className="py-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </Marquee>
      </motion.section>

      {/* Trust Indicators Section with high-impact bottom sliding (plus scale and rotation) */}
      <motion.section
        variants={highMotionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        className="py-16 bg-white"
      >
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
      </motion.section>
      <Footer />
    </div>
  );
};

export default Home;
