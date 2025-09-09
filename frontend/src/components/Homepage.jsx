import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Users, BookOpen, BadgeCheck } from "lucide-react";

const Homepage = () => {
  return (
    <div className="relative overflow-hidden min-h-screen text-white pt-24 bg-gradient-to-br from-[#0d0d2b] via-[#3f237c] to-[#8c5cc3]">

      {/* 🟣 Floating Gradient Bubbles */}
      {/* 🟣 Floating Bubbles Working Version */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl opacity-30"
            style={{
              backgroundColor: "#a855f7", // Purple
              width: 100,
              height: 100,
              top: `${10 * i}%`,
              left: `${10 * (i % 5)}%`,
            }}
            animate={{
              y: [0, -30, 30, 0],
              x: [0, 20, -20, 0],
            }}
            transition={{
              duration: 25 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>




      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        {/* Text Content */}
        <div className="text-left md:w-1/2 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Prepare for <br />
            <motion.span
              className="text-orange-400 inline-block cursor-pointer"
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 10px #f97316",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Campus Placements
            </motion.span> <br />
            Like Never Before
          </h1>

          <p className="text-lg text-gray-200 max-w-md">
            Your one-stop platform for company details, interview patterns,
            practice questions, and real-time placement updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
            >
              Get Started →
            </Link>
            <Link
              to="/companies"
              className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition"
            >
              Explore Companies
            </Link>
          </div>
        </div>

        {/* Mockup Card */}
        <div className="md:w-[550px] lg:w-[600px]">
          <div className="w-full bg-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl scale-105 transition duration-300 ease-in-out">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="h-28 bg-white/10 rounded-xl flex items-center justify-center">
                <Building2 size={40} className="text-white" />
              </div>
              <div className="h-28 bg-white/10 rounded-xl flex items-center justify-center">
                <Users size={40} className="text-white" />
              </div>
              <div className="h-28 bg-white/10 rounded-xl flex items-center justify-center">
                <BookOpen size={40} className="text-white" />
              </div>
              <div className="h-28 bg-white/10 rounded-xl flex items-center justify-center">
                <BadgeCheck size={40} className="text-white" />
              </div>
            </div>
            <div className="h-6 bg-white/10 rounded-full mb-3"></div>
            <div className="h-6 bg-white/10 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>

      {/* White gradient fade at bottom */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-white/90 to-transparent z-0"></div>
    </div>
  );
};

export default Homepage;
