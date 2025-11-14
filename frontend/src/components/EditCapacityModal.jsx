import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateLocationCapacity } from "../services/api";

const EditCapacityModal = ({ isOpen, onClose, location, onSuccess }) => {
  const [capacity, setCapacity] = useState(0);

  useEffect(() => {
    if (location) setCapacity(location.capacity);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await updateLocationCapacity(location._id, { capacity });
        toast.success("Capacity updated successfully");
        onSuccess();
        onClose();
    } catch (err) {
        toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (!isOpen || !location) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Capacity</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-center font-medium">Capacity: {capacity}</p>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCapacityModal;
