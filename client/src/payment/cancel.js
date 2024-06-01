import React from 'react';

const Cancel = () => {

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Cancel</h2>
        <p className="text-gray-700">Your Payment has been cancelled.</p>
      </div>
    </div>
  );
};

export default Cancel;
