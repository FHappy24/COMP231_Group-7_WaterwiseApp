import React, { useState } from "react";
import toast from "react-hot-toast";
import { createLocation } from "../services/api";

const AddLocationModal = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return toast.error("Please enter a title");

    try {
        await createLocation({ title });
        toast.success("Location added successfully");
        setTitle("");
        onSuccess();
        onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add location");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Location</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            placeholder="Enter location title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationModal;
