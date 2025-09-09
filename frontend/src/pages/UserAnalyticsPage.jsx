import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const placements = [
    {
        year: "2024-2025",
        file: "/assets/pdfs/2024-2025 PLACEMENTS.pdf",
    },
    {
        year: "2023-2024",
        file: "/assets/pdfs/2023-2024 PLACEMENTS.pdf",
    },
    {
        year: "2022-2023",
        file: "/assets/pdfs/2022-2023 PLACEMENTS.pdf",
    },
    {
        year: "2021-2022",
        file: "/assets/pdfs/2021-2022 PLACEMENTS.pdf",
    },
];

const UserAnalyticsPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 px-6 py-10 text-gray-800 dark:text-white">

            {/* Wrapper to align the button left */}
            <div className="mb-10">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-white font-semibold py-2.5 px-5 rounded-xl shadow-lg 
                 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                 hover:scale-105 transform transition-all duration-300 ease-in-out 
                 hover:shadow-purple-500/50 border border-transparent hover:border-white"
                >
                    ← Back to Dashboard
                </Link>
            </div>


            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-6 text-center">Placement Reports</h1>

            {/* Placement Cards */}
            <div className="space-y-4 max-w-3xl mx-auto">
                {placements.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex justify-between items-center hover:shadow-md transition"
                    >
                        <div className="flex items-center gap-3">
                            <FileText className="text-blue-500" />
                            <h2 className="text-lg font-semibold">
                                Placement Details {item.year}
                            </h2>
                        </div>
                        <a
                            href={item.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-block px-4 py-1.5 font-medium text-sm text-white rounded-md overflow-hidden group
                         bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 
                         transition-all duration-300 ease-in-out"
                        >
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 transform scale-0 bg-white opacity-10 group-hover:scale-100"></span>
                            <span className="relative z-10">View PDF</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserAnalyticsPage;
