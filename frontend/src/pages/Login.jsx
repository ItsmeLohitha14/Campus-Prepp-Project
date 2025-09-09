import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const isAdmin = form.email === 'admin';
      const data = await login(
        { username: form.email, password: form.password },
        isAdmin
      );

      localStorage.setItem('token', data.token);
      if (!isAdmin && data.user?.name) {
        localStorage.setItem('userName', data.user.name);
      }

      alert('Login successful!');
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          onClick={() => navigate('/')}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your credentials to access your account.
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium mb-1">
            Email / Username
          </label>
          <input
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
            placeholder="admin or johndoe@example.com"
            className="w-full border rounded-md p-2 mb-4 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border rounded-md p-2 pr-10 outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-purple-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
