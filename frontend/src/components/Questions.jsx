import React, { useState } from 'react';
import { FaCode, FaUserTie, FaCalculator } from 'react-icons/fa';

const questionsData = [
  {
    category: 'Technical',
    company: 'Deloitte',
    icon: <FaCode className="text-blue-500" />,
    question: 'What is the difference between SQL and NoSQL databases?',
    answer:
      'SQL databases are relational and use structured query language, while NoSQL databases are non-relational and store data in various formats like key-value, document, or graph.',
  },
  {
    category: 'Technical',
    company: 'Lumen',
    icon: <FaCode className="text-blue-500" />,
    question: 'Explain the concept of microservices architecture.',
    answer:
      'Microservices architecture breaks down applications into smaller, independent services that can be deployed and scaled individually.',
  },
  {
    category: 'Technical',
    company: 'Coforge',
    icon: <FaCode className="text-blue-500" />,
    question: 'What are the key differences between REST and SOAP APIs?',
    answer:
      'REST uses HTTP and is stateless, whereas SOAP is a protocol with strict standards and supports more security features.',
  },
  {
    category: 'Technical',
    company: 'Sopra Steria',
    icon: <FaCode className="text-blue-500" />,
    question: 'How does garbage collection work in Java?',
    answer:
      'Java automatically deallocates memory by identifying and removing objects that are no longer in use using the garbage collector.',
  },
  {
    category: 'HR',
    company: 'Deloitte',
    icon: <FaUserTie className="text-green-500" />,
    question: 'Tell me about a time you resolved a conflict in a team.',
    answer:
      'I actively listened to both sides, facilitated open communication, and helped reach a compromise that satisfied everyone involved.',
  },
  {
    category: 'HR',
    company: 'Lumen',
    icon: <FaUserTie className="text-green-500" />,
    question: 'Where do you see yourself in five years?',
    answer:
      'In five years, I see myself growing into a leadership role and contributing significantly to company goals.',
  },
  {
    category: 'HR',
    company: 'Coforge',
    icon: <FaUserTie className="text-green-500" />,
    question: 'Describe a situation where you had to work under pressure.',
    answer:
      'During a project deadline crunch, I prioritized tasks, stayed organized, and coordinated with my team to deliver on time.',
  },
  {
    category: 'HR',
    company: 'Sopra Steria',
    icon: <FaUserTie className="text-green-500" />,
    question: 'What is your greatest strength and weakness?',
    answer:
      'My strength is adaptability, and my weakness is overcommitting—something I’m actively working to balance.',
  },
  {
    category: 'Aptitude',
    company: 'Deloitte',
    icon: <FaCalculator className="text-purple-500" />,
    question: 'If a train travels 60 km in 45 minutes, what is its speed in km/h?',
    answer: 'Speed = 60 ÷ (45/60) = 80 km/h.',
  },
  {
    category: 'Aptitude',
    company: 'Lumen',
    icon: <FaCalculator className="text-purple-500" />,
    question: 'Solve: (5/8) of 64 + 36 ÷ 6',
    answer: 'Answer = (5/8)*64 = 40; 36 ÷ 6 = 6 → Total = 46',
  },
  {
    category: 'Aptitude',
    company: 'Coforge',
    icon: <FaCalculator className="text-purple-500" />,
    question: 'What is the least common multiple (LCM) of 12 and 15?',
    answer: 'LCM of 12 and 15 is 60.',
  },
  {
    category: 'Aptitude',
    company: 'Sopra Steria',
    icon: <FaCalculator className="text-purple-500" />,
    question: 'If 8 men can complete a job in 10 days, how long will 4 men take?',
    answer: 'Time taken = (8×10)/4 = 20 days.',
  },
];

export default function Questions() {
  const [selectedCategory, setSelectedCategory] = useState('Technical');
  const [openIndex, setOpenIndex] = useState(null);
  const categories = ['Technical', 'HR', 'Aptitude'];
  const filtered = questionsData.filter(q => q.category === selectedCategory);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mt-4 mb-8 text-lg">
          Sharpen your skills with real interview questions asked by top-tier companies.
        </p>

        {/* Category Buttons */}
        <div className="bg-gray-100 rounded-lg flex justify-center mb-8 overflow-hidden shadow-sm flex-wrap gap-2 py-2 px-3">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white rounded-md shadow'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {filtered.map((q, idx) => (
            <div
              key={idx}
              onClick={() => toggle(idx)}
              className={`border-l-4 p-4 rounded-md shadow-sm cursor-pointer transition-all duration-200 bg-white hover:shadow-md ${
                q.category === 'Technical'
                  ? 'border-blue-500'
                  : q.category === 'HR'
                  ? 'border-green-500'
                  : 'border-purple-500'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Icon + Question */}
                <div className="flex items-start gap-3">
                  {q.icon}
                  <span className="font-medium text-gray-800 text-base">{q.question}</span>
                </div>

                {/* Right: Company + Category Tags */}
                <div className="flex gap-2 flex-wrap justify-end">
                  <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium">
                    {q.company}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      q.category === 'Technical'
                        ? 'bg-blue-100 text-blue-800'
                        : q.category === 'HR'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {q.category}
                  </span>
                </div>
              </div>

              {/* Answer */}
              {openIndex === idx && (
                <div className="mt-3 text-sm text-gray-700 border-t pt-2">{q.answer}</div>
              )}
            </div>
          ))}
        </div>

        {/* View All Resources Button */}
        <div className="flex justify-center mt-12">
          <button className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition">
            View All Resources →
          </button>
        </div>
      </div>
    </div>
  );
}
