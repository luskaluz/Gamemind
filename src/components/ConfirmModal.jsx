// src/components/ConfirmModal.jsx
import React from "react";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg max-w-sm w-full">
        <p className="mb-4 text-center">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
