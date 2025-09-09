import React from "react";
import { Building2, UserRound, BookOpen, Download } from "lucide-react";

const StatsGrid = () => {
  const stats = [
    { icon: <Building2 size={28} className="text-purple-500" />, value: "50+", label: "Companies" },
    { icon: <UserRound size={28} className="text-purple-500" />, value: "1200+", label: "Students Placed" },
    { icon: <BookOpen size={28} className="text-purple-500" />, value: "500+", label: "Interview Questions" },
    { icon: <Download size={28} className="text-purple-500" />, value: "30+", label: "Resources" },
  ];

  return (
    <div className="relative bg-gradient-to-t from-white via-[#f4f1ff] to-[#ece8ff] pt-4 pb-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="backdrop-blur-xl bg-white/30 border border-white/20 shadow-xl rounded-3xl p-6 text-center hover:scale-105 transition-all duration-300"
          >
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-purple-100">
              {item.icon}
            </div>
            <div className="text-3xl font-bold text-gray-900">{item.value}</div>
            <div className="text-gray-700 text-sm">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
