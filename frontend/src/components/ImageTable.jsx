import { useState } from "react";

const ImageTable = ({ data = [], showUsers = false }) => {
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const perPage = 10;

  // Sort newest first
  const sortedData = [...data].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const startIndex = (page - 1) * perPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + perPage);

  const handleImageClick = (img) => setSelectedImage(img);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className={`bg-white shadow-md rounded-xl p-4 relative ${showUsers ? 'mt-1' : 'mt-10'}`}>
      <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">S.No.</th>
            <th className="p-2 border">Image</th>
            {showUsers && <th className="p-2 border">User</th>}
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={showUsers ? 5 : 4} className="text-center p-4 text-gray-500">
                No images found
              </td>
            </tr>
          ) : (
            paginatedData.map((img, idx) => (
              <tr key={img._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{startIndex + idx + 1}</td>
                <td className="p-2">
                  <img
                    src={`${process.env.REACT_APP_API_URL}${img.imageUrl}`}
                    alt="uploaded"
                    className="h-16 w-16 object-cover rounded cursor-pointer"
                    onClick={() => handleImageClick(img.imageUrl)}
                  />
                </td>
                {showUsers && (
                  <td className="p-2">{img.userID?.name || "N/A"}</td>
                )}
                <td className="p-2">{img.location}</td>
                <td className="p-2">{new Date(img.createdAt).toLocaleString()}</td>
                
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <p>Page {page}</p>
        <button
          disabled={page * perPage >= sortedData.length}
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-3xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${process.env.REACT_APP_API_URL}${selectedImage}`}
              alt="Preview"
              className="w-full h-auto object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute -top-3 -right-3 bg-white px-3 py-1 rounded-full shadow z-999"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageTable;
