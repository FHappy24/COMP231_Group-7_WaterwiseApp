import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const CapacityChart = ({ locations }) => {
  const chartData = locations.map((loc) => ({
    name: loc.title,
    used: 100 - loc.capacity,
    remaining: loc.capacity,
  }));

  const getColor = (remaining) => {
    if (remaining <= 10) return '#ef4444'; // red
    if (remaining <= 30) return '#f59e0b'; // orange
    return '#10b981'; // green
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Location Capacity Usage</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="used" stackId="a" fill="#3b82f6" name="Used %" />
          <Bar dataKey="remaining" stackId="a" name="Remaining %">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.remaining)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CapacityChart;