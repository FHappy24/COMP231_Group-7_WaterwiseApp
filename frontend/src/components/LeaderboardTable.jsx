import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getLeaderboard } from "../services/api";

const LeaderboardTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await getLeaderboard();
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load leaderboard");
    }
  };

  const startIndex = (page - 1) * perPage;
  const paginatedUsers = users.slice(startIndex, startIndex + perPage);

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Rank</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Points</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((u) => (
            <tr key={u._id} className="border-t hover:bg-gray-50">
              <td className="p-2">{u.rank}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
          disabled={page * perPage >= users.length}
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeaderboardTable;
