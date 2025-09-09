// src/pages/QuestionDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const QuestionDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">Question Details</h2>
      <p>Question ID: {id}</p>
      {/* You can add more logic to fetch and display full question details */}
    </div>
  );
};

export default QuestionDetails;
