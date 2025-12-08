// components/ModalWrapper.jsx
export default function ModalWrapper({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#1E1E2F] p-6 rounded-xl shadow-lg w-96 relative">
        <button
          className="absolute top-3 right-3 text-[#E0E0E0] font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
