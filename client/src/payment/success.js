import React from 'react';

const Success = () => {

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Success</h2>
        <p className="text-gray-700">Your Payment was successful!</p>
      </div>
    </div>
  );
};

export default Success;
