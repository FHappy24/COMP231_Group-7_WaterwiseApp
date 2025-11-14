import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center h-[calc(100vh-60px)] w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/recycle-bg.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center text-white max-w-2xl lg:max-w-4xl px-6">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight">
          Join the Green Revolution with <span className="text-green-400">EcoTrack</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          Track your eco impact, recycle smarter, and make the planet greener—one action at a time.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default Home;
