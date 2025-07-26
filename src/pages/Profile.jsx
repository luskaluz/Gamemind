// src/pages/Profile.jsx
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#00ff88', '#ff5555', '#ffaa00', '#8888ff', '#ff44cc'];

export default function Profile({ reflections }) {
  // Contar emoções
  const emotionCount = reflections.reduce((acc, curr) => {
    acc[curr.emotion] = (acc[curr.emotion] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(emotionCount).map(([emotion, count]) => ({
    name: emotion,
    value: count,
  }));

  if (data.length === 0)
    return <p className="text-gray-400 mt-6 text-center">Nenhuma reflexão registrada.</p>;

  return (
    <div className="max-w-md mx-auto mt-8 bg-[#1c1c1c] p-6 rounded-lg shadow-md">
      <h2 className="text-greenAccent text-2xl font-bold mb-4 text-center">Seu Perfil Emocional</h2>
      <div className="flex justify-center items-center">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}