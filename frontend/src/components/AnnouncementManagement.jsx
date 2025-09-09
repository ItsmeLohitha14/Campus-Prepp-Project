import React, { useEffect, useState } from 'react';
import { postAnnouncement, getAnnouncements } from '../services/announcementService';
import { Bell, Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function AnnouncementManagement() {
  const [form, setForm] = useState({ title: '', message: '' });
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      const res = await getAnnouncements();
      setAnnouncements(res.data);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const playSound = () => {
    const audio = new Audio('/assets/announcement.mp3'); // Path relative to `public`
    audio.play().catch(err => {
      console.error('Audio play error:', err);
    });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.message) return;

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/announcements/${editingId}`, form);
        toast.success('Announcement updated!');
        setEditingId(null);
      } else {
        await postAnnouncement(form);
        toast.success('Announcement posted!');
      }
      playSound();
      setForm({ title: '', message: '' });
      fetchAnnouncements();
    } catch (err) {
      console.error('Failed to submit:', err);
      toast.error('Submission failed!');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
      fetchAnnouncements();
      toast.success('Announcement deleted!');
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Delete failed!');
    }
  };

  const handleEdit = (announcement) => {
    setForm({ title: announcement.title, message: announcement.message });
    setEditingId(announcement._id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 relative">
      <Toaster position="top-right" />

      {/* 🔔 Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-orange-500 bg-orange-100 p-2 rounded-full">
          <Bell />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
          <p className="text-sm text-gray-500">Post campus-wide announcements</p>
        </div>
      </div>

      {/* 📝 Form */}
      <div className="space-y-5 mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Announcement Title
          </label>
          <input
            className="w-full border border-gray-300 focus:border-orange-500 focus:ring-orange-500 p-3 rounded-lg"
            placeholder="e.g. Campus Drive by TCS"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            className="w-full border border-gray-300 focus:border-orange-500 focus:ring-orange-500 p-3 rounded-lg"
            rows={4}
            placeholder="Write the announcement message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-all"
        >
          {editingId ? 'Update Announcement' : 'Post Announcement'}
        </button>
      </div>

      {/* 📜 Announcements */}
      {announcements.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Bell className="text-orange-500" /> All Announcements
          </h3>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-orange-50 to-white border border-orange-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-orange-700">{item.title}</h4>
                    <p className="text-sm text-gray-800 mt-1">{item.message}</p>
                    <span className="inline-block text-xs text-gray-500 mt-2 bg-orange-100 px-2 py-1 rounded-full">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
