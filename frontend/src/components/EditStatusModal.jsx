import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateImageStatus } from "../services/api";

const EditStatusModal = ({ isOpen, onClose, image, onSuccess }) => {
  const [status, setStatus] = useState("Low");
  const statuses = ["Reported", " In Progress", "Fixed"]

  useEffect(() => {
    if (image) setStatus(image.status);
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await updateImageStatus(image._id, { status });
        toast.success("Status updated successfully");
        onSuccess();
        onClose();
    } catch (err) {
        toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Status</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Status</option>
            {statuses.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
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

export default EditStatusModal;
