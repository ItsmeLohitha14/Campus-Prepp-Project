import React from "react";
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

const AnalyticsPage = () => {
  return (
    <div className="w-full bg-[#f8fafc] dark:bg-gray-900 px-6 py-10 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Placement Reports</h1>

      <div className="space-y-4">
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
              className="text-sm text-blue-600 hover:underline"
            >
              View PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;
