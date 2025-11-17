import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllImages, getAllLocations} from '../services/api';
import LeaderboardTable from '../components/LeaderboardTable';
import LocationsTable from '../components/LocationsTable';
import CapacityChart from '../components/CapacityChart';
import AddLocationModal from '../components/AddLocationModal';
import EditCapacityModal from '../components/EditCapacityModal';
import toast from 'react-hot-toast';
import ImageTable from '../components/ImageTable';

const CustodianDashboard = () => {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    fetchLocations();
    GetAllImages();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await getAllLocations();
      setLocations(response.data);
    } catch (error) {
      toast.error('Failed to load locations');
    } finally {
      setLoading(false);
    }
  };

  const GetAllImages = async () => {
    setLoadingImages(true);
    try {
      const response = await getAllImages();
      setImages(response.data);
    } catch (error) {
      toast.error("Failed to load images");
    } finally {
      setLoadingImages(false);
    }
  };

  const handleEdit = (location) => {
    setSelectedLocation(location);
    setIsEditModalOpen(true);
  };

  const handleSuccess = () => {
    fetchLocations();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Custodian Dashboard - {user.name}
        </h1>

        {/* Leaderboard */}
        {/*<div className="mb-8">
          <LeaderboardTable />
        </div>*/}

        <div className="my-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">User Uploads</h2>
          <button
            onClick={GetAllImages}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold"
          >
            {loadingImages ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loadingImages ? (
            <div className='bg-white w-full rounded-lg shadow flex justify-center items-center p-5 min-h-64 mb-8'>
              <p className="text-center text-gray-500 py-8 text-lg">Loading...</p>
            </div>
          ) : (
            <div className='mb-8'>
              <ImageTable data={images} showUsers={true} />
            </div>
          )}

        {/* Capacity Chart */}
        {locations.length > 0 && (
          <div className="mb-8">
            <CapacityChart locations={locations} />
          </div>
        )}

        {/* Locations Table */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Manage Locations</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
          >
            + Add Location
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading locations...</div>
        ) : (
          <LocationsTable locations={locations} onEdit={handleEdit} />
        )}
      </div>

      <AddLocationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleSuccess}
      />

      {/* <EditCapacityModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        location={selectedLocation}
        onSuccess={handleSuccess}
      /> */}
    </div>
  );
};

export default CustodianDashboard;