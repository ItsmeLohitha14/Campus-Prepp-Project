import React from 'react';
import { FaBell, FaCalendarAlt } from 'react-icons/fa';

const updates = [
  {
    title: 'Lumen Recruitment Drive Announced',
    date: '12 May 2025',
    description: 'Lumen will be conducting an on-campus recruitment drive for 2025 batch students. Register before May 28.',
    company: 'Lumen',
    isNew: true
  },
  {
    title: 'Pre-Placement Talk: Sopra Steria',
    date: '05 Jun 2025',
    description: 'Sopra Steria will be conducting a pre-placement talk on June 5. Attendance is mandatory for all registered students.',
    company: 'Sopra Steria',
    isNew: true
  },
  {
    title: 'Deloitte Mock Interview Session',
    date: '28 May 2025',
    description: 'Deloitte will be hosting a mock interview session to help you prepare. Limited slots available.',
    company: 'Deloitte',
    isNew: false
  }
];

const Updates = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 mt-4 text-gray-800">Placement Updates</h1>
        <p className="text-center text-gray-600 mb-6 text-lg">
          Stay informed with the latest placement announcements, events, and opportunities.
        </p>

        <div className="flex items-center gap-2 text-purple-700 font-semibold text-lg mb-4">
          <FaBell /> Latest Updates
        </div>

        <div className="space-y-4">
          {updates.map((update, idx) => (
            <div
              key={idx}
              className="bg-white rounded-md p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start flex-col sm:flex-row gap-4 sm:gap-0">
                {/* Left - Text Content */}
                <div>
                  <h2 className="text-md font-semibold text-gray-900">{update.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                  <a href="#" className="text-sm mt-2 inline-block text-purple-600 hover:underline font-medium">
                    Read more →
                  </a>
                </div>

                {/* Right - Labels */}
                <div className="flex flex-col items-start sm:items-end gap-1">
                  {update.isNew && (
                    <span className="text-xs text-white bg-orange-500 rounded px-2 py-0.5 font-bold">
                      New
                    </span>
                  )}
                  <span className="flex items-center text-xs text-gray-700 bg-gray-100 rounded px-2 py-1">
                    <FaCalendarAlt className="mr-1 text-gray-500" /> {update.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition">
            View All Updates →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updates;
