import React, { useEffect, useState } from "react";
import { PlusCircle, X, Pencil } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
    eligibility: "",
    date: "",
    positions: "",
  });

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/companies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompanies(res.data);
    } catch (err) {
      console.error("Error fetching companies:", err.response?.data || err.message);
      toast.error("Failed to load companies");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateCompany = async () => {
    if (!token) return toast.error("Admin not authenticated");

    const payload = {
      name: formData.name,
      logo: formData.logo,
      description: formData.description,
      eligibility: formData.eligibility,
      date: formData.date,
      roles: formData.positions.split(",").map((role) => role.trim()),
    };

    try {
      if (editMode) {
        const res = await axios.put(
          `http://localhost:5000/api/admin/update-company/${editingCompanyId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Company updated successfully!");
        await fetchCompanies();
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/admin/add-company",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Company added successfully!");
        setCompanies((prev) => [...prev, res.data.company]);
      }

      setFormData({
        name: "",
        logo: "",
        description: "",
        eligibility: "",
        date: "",
        positions: "",
      });
      setEditMode(false);
      setEditingCompanyId(null);
    } catch (err) {
      console.error("Company add/update error:", err.response?.data || err.message);
      toast.error("Failed to submit company");
    }
  };

  const handleEditCompany = (company) => {
    setFormData({
      name: company.name,
      logo: company.logo,
      description: company.description,
      eligibility: company.eligibility,
      date: company.date,
      positions: company.roles?.join(", "),
    });
    setEditMode(true);
    setEditingCompanyId(company._id || company.id);
  };

  return (
    <div className="bg-white dark:bg-white rounded-xl shadow-md p-6">
      <ToastContainer />

      <div className="flex items-center space-x-3 mb-6">
        <PlusCircle className="text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold text-black">Company Management</h3>
          <p className="text-sm text-black">Add and manage recruiting companies</p>
        </div>
      </div>

      {/* Edit Mode Banner */}
      {editMode && (
        <div className="mb-4 bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-md flex justify-between items-center">
          <span>Editing: <strong>{formData.name}</strong></span>
          <button
            onClick={() => {
              setEditMode(false);
              setEditingCompanyId(null);
              setFormData({
                name: "",
                logo: "",
                description: "",
                eligibility: "",
                date: "",
                positions: "",
              });
            }}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Cancel Edit
          </button>
        </div>
      )}

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Company Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Logo URL</label>
          <input
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            type="text"
            className="w-full border rounded-md p-2"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-black">Company Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-md p-2"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Eligibility Criteria</label>
          <input
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
            type="text"
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-black">Campus Visit Date</label>
          <input
            name="date"
            value={formData.date}
            onChange={handleChange}
            type="text"
            className="w-full border rounded-md p-2"
          />
        </div>
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-1 text-black">Available Positions</label>
        <input
          name="positions"
          value={formData.positions}
          onChange={handleChange}
          type="text"
          className="w-full border rounded-md p-2"
        />
        <p className="text-xs mt-1 text-gray-600">Separate multiple roles with commas</p>
      </div>

      <button
        onClick={handleAddOrUpdateCompany}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md flex items-center gap-2"
      >
        <PlusCircle size={18} /> {editMode ? "Update Company" : "Add Company"}
      </button>

      {/* Company List */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-black mb-4">Added Companies</h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company._id || company.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <div className="flex flex-col items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 object-contain mb-2"
                />
                <h4 className="font-semibold text-md text-center mb-2">
                  {company.name}
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCompany(company)}
                    className="text-sm px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleEditCompany(company)}
                    className="text-sm px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md flex items-center"
                  >
                    <Pencil size={14} className="mr-1" /> Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setSelectedCompany(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">
              {selectedCompany.name} Details
            </h3>
            <p className="mb-2">
              <strong>Description:</strong> {selectedCompany.description || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Eligibility:</strong> {selectedCompany.eligibility || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Visit Date:</strong> {selectedCompany.date || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Positions:</strong> {selectedCompany.roles?.join(", ") || "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;
