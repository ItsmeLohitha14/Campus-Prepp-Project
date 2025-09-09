import React from 'react';
import { Link } from 'react-router-dom'; // import Link

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-[#2f144e] to-[#7f5af0] text-white py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Ace Your Placements?
        </h1>
        <p className="text-base md:text-lg mb-6">
          Join CampusPrep today and get access to all the resources you need to succeed in your campus placements.
        </p>

        {/* Link to Register page */}
        <Link
          to="/register"
          className="inline-block bg-white text-black font-semibold py-2.5 px-5 rounded-md shadow-md hover:bg-gray-100 transition"
        >
          Register Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
