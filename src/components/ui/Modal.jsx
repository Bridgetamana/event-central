import React from 'react';

const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg text-center">{message}</h2>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 px-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
