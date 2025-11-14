import React from 'react';

const LocationsTable = ({ locations, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Locations</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Capacity</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Created By</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => {
              const isLowCapacity = location.capacity <= 10;
              return (
                <tr
                  key={location._id}
                  className={`border-b hover:bg-gray-50 ${
                    isLowCapacity ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-sm font-medium">{location.title}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isLowCapacity
                          ? 'bg-red-200 text-red-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {location.capacity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{location.createdBy}</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => onEdit(location)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Edit Capacity
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationsTable;