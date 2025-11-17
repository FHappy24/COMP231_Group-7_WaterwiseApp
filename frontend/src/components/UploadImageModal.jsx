import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getLocations, uploadImage } from "../services/api";

const UploadImageModal = ({ isOpen, onClose, onSuccess }) => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("");
  const [locations, setLocations] = useState([]);
  const priorities = ["High", "Medium", "Low"]

  useEffect(() => {
    if (isOpen) fetchLocations();
  }, [isOpen]);

  const fetchLocations = async () => {
    try {
      getLocations().then((res) => {
        setLocations(res.data);
      });
    } catch (err) {
      toast.error("Failed to load locations");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !location || !issue || !priority) return toast.error("All fields are required");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("location", location);
    formData.append("issue", issue);
    formData.append("priority", priority);

    try {
      await uploadImage(formData);
      toast.success("Image uploaded successfully");
      onSuccess();
      onClose();
      setImage(null);
      setLocation("");
      setIssue("");
      setPriority("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            onChange={(e) => setIssue(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter Issue : Water Spill, Full Bin..."
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc._id}>
                {loc.title}
              </option>
            ))}
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Priority</option>
            {priorities.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadImageModal;
