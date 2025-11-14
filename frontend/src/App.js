import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard';
import CustodianDashboard from './pages/CustodianDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const DashboardRouter = () => {
  const { user } = require('./context/AuthContext').useAuth();
  return user?.isCustodian ? <CustodianDashboard /> : <UserDashboard />;
};

export default App;