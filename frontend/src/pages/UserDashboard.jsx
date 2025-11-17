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
  const [points, setPoints] = useState(user.points);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetUserImages();
  }, [user.points]);

  const GetUserImages = async () => {
    try {
      const response = await getMyImages();
      setImages(response.data);
    } catch (error) {
      toast.error("Failed to load your images");
    }
  };

  const handleUploadSuccess = () => {
    GetUserImages();
  };

  const refreshPoints = async () => {
    setLoading(true)
    await getUser(user._id).then(res => {
      setPoints(res.data.points)
    })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome, {user.name}!
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
            <div className='flex justify-between items-start gap-3'>
              <h3 className="text-lg font-semibold mb-2">Your Points</h3>
              <button
                type='button'
                onClick={refreshPoints}
                className='bg-white p-2 rounded text-green-500 font-semibold'
              >
                <img src="/icons8-refresh.svg" alt="" className='w-5 h-5'/>
              </button>
            </div>
            <p className="text-4xl font-bold">{loading ? "Loading...": points}</p>
          </div>
          
          <div className="bg-white/50 rounded-lg shadow-lg p-6 flex flex-col justify-center">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
            >
              Report an Issue
            </button>
          </div>
        </div>

        {/* Leaderboard 
        <LeaderboardTable key={refreshKey} />
        */}
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