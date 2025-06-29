// src/components/Modal.jsx
export default function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 bg-opacity-50 rounded-xl shadow-lg p-4 w-full max-w-6xl h-[85vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-white text-2xl font-bold hover:text-red-500">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
} 