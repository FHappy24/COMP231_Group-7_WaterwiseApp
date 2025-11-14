import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getLeaderboard, getMyImages, getUser } from '../services/api';
import LeaderboardTable from '../components/LeaderboardTable';
import UploadImageModal from '../components/UploadImageModal';
import ImageTable from '../components/ImageTable';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const { user } = useAuth();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [userRank, setUserRank] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [points, setPoints] = useState(user.points);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchUserRank();
    GetUserImages();
  }, [user.points]);

  const fetchUserRank = async () => {
    try {
      const response = await getLeaderboard();
      const rank = response.data.findIndex(u => u._id === user._id) + 1;
      setUserRank(rank || '-');
    } catch (error) {
      console.error('Failed to fetch rank');
    }
  };

  const GetUserImages = async () => {
    try {
      const response = await getMyImages();
      setImages(response.data);
    } catch (error) {
      toast.error("Failed to load your images");
    }
  };

  const handleUploadSuccess = async() => {
    await getUser(user._id).then(res => {
        setPoints(res.data.points);
      }
    );
    setRefreshKey(prev => prev + 1);
    fetchUserRank();
    GetUserImages();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome, {user.name}!
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Your Rank</h3>
            <p className="text-4xl font-bold">#{userRank}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Your Points</h3>
            <p className="text-4xl font-bold">{points}</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
            >
              📸 Upload Image
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <LeaderboardTable key={refreshKey} />
        <ImageTable data={images} showUsers={false} />
      </div>

      <UploadImageModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default UserDashboard;