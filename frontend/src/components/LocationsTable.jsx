const LocationsTable = ({ locations }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full md:max-w-[40%]">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Locations</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Created By</th>
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
                  <td className="px-4 py-3 text-sm">{location.createdBy}</td>
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