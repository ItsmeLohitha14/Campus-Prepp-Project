import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const companies = [
  {
    name: "Deloitte",
    logo: "/assets/Deloitte.png",
  },
  {
    name: "Lumen",
    logo: "/assets/lumen.jpg",
  },
  {
    name: "Coforge",
    logo: "/assets/coforge.jpg",
  },
  {
    name: "Sopra Steria",
    logo: "/assets/sopra_steria.png",
  },
];

const Companies = () => {
  return (
    <div className="pt-32 pb-20 bg-[#f9fafc] min-h-screen px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-4xl font-bold text-gray-900 mb-4">
          Featured Companies
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-lg mb-12">
          Explore top companies that recruit from our campus. View details,
          interview processes, and prepare accordingly.
        </p>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {companies.map((company, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative bg-white rounded-xl border border-transparent hover:border-purple-500 transition-all shadow-sm hover:shadow-purple-300 p-6 flex flex-col items-center text-center duration-300 ease-in-out"
            >
              {/* Top glow line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Logo */}
              <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-6 shadow-inner group-hover:shadow-md transition">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Company Name */}
              <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition">
                {company.name}
              </h4>

              {/* View Details Button */}
              <Link
                to={`/companies/${company.name.toLowerCase().replace(/\s/g, "-")}`}
                className="bg-purple-50 text-purple-600 px-4 py-2 rounded-md font-medium text-sm shadow-sm group-hover:bg-purple-100 transition"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition"
          >
            View all companies →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Companies;



