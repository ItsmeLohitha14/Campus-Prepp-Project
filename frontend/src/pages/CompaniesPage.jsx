import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCompaniesForStudent } from "../services/companyService";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCompaniesForStudent();
      setCompanies(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 px-6 py-10 text-gray-800 dark:text-white">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 mb-10 text-white font-semibold py-2.5 px-5 rounded-xl shadow-lg 
               bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
               hover:scale-105 transform transition-all duration-300 ease-in-out 
               hover:shadow-purple-500/50 border border-transparent hover:border-white"
      >
        ← Back to Dashboard
      </Link>


      <h1 className="text-3xl font-bold text-center mb-10">All Companies</h1>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading companies…
        </p>
      ) : companies.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No companies found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition max-w-xs w-full mx-auto"
            >
              {/* Logo */}
              <div className="flex justify-center mb-4">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-10 object-contain"
                  />
                ) : (
                  <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full text-sm font-semibold uppercase text-purple-600">
                    {company.name.slice(0, 2)}
                  </div>
                )}
              </div>

              {/* Name */}
              <h2 className="text-lg font-semibold text-center mb-4">
                {company.name}
              </h2>

              {/* View More button */}
              <div className="flex justify-center">
                <button
                  onClick={() => toggleExpand(company._id)}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition"
                >
                  {expanded === company._id ? "Hide Details" : "View More"}
                </button>
              </div>

              {/* Expanded details */}
              {expanded === company._id && (
                <div className="mt-4 text-sm space-y-2 border-t pt-4 border-gray-200 dark:border-gray-700">
                  {company.eligibility && (
                    <p>
                      <span className="font-medium">Eligibility:</span>{" "}
                      {company.eligibility}
                    </p>
                  )}
                  {company.date && (
                    <p>
                      <span className="font-medium">Visit Date:</span>{" "}
                      {company.date}
                    </p>
                  )}
                  {company.roles?.length > 0 && (
                    <p>
                      <span className="font-medium">Roles:</span>{" "}
                      {company.roles.join(", ")}
                    </p>
                  )}
                  {company.description && (
                    <p>
                      <span className="font-medium">Description:</span>{" "}
                      {company.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
