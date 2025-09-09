import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Added

const CodingHub = () => {
  const [form, setForm] = useState({ title: "", leetcodeLink: "" });
  const [questions, setQuestions] = useState([]);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate(); // ✅ React Router navigation hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/questions");
      setQuestions(res.data);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/questions/${editId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/questions", form);
      }
      setForm({ title: "", leetcodeLink: "" });
      setEditId(null);
      fetchQuestions();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (question) => {
    setForm({ title: question.title, leetcodeLink: question.leetcodeLink });
    setEditId(question._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/questions/${id}`);
      fetchQuestions();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleQuestionClick = (id) => {
    navigate(`/question/${id}`); // ✅ Redirect to question details page
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 min-h-[160px] flex flex-col justify-between">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        📌 Post a Coding Question
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Question Title"
          className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="url"
          name="leetcodeLink"
          value={form.leetcodeLink}
          onChange={handleChange}
          placeholder="LeetCode Link"
          className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
        >
          {editId ? "Update" : "Submit"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
        📚 All Questions
      </h3>

      <ul className="space-y-2">
        {questions.map((q, index) => (
          <li
            key={q._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div className="cursor-pointer">
              <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">
                {questions.length - index}.
              </span>
              <span
                onClick={() => handleQuestionClick(q._id)}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {q.title}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(q)}
                className="text-yellow-600 hover:text-yellow-700"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(q._id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodingHub;
