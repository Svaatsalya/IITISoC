import { useRef, useEffect } from "react";

export default function Modal({ show, onClose, children }) {
  const modalRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-hidden">
        <div
          ref={modalRef}
          className="bg-gray-800 bg-opacity-50 rounded-xl shadow-lg p-4 w-full max-w-6xl h-[85vh] overflow-y-auto relative scrollbar-hide"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-white text-2xl font-bold hover:text-red-500"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
