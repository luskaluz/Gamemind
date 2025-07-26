import { useState } from 'react';

const emotionsList = [
  { label: 'Feliz', value: '😄' },
  { label: 'Triste', value: '😢' },
  { label: 'Tenso', value: '😱' },
  { label: 'Reflexivo', value: '🤔' },
  { label: 'Frustrado', value: '😤' },
];

export default function Filters({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleEmotionToggle = (emotion) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      searchTerm,
      selectedEmotions,
      dateFrom,
      dateTo,
    });
  };

  return (
    <div className="mb-4 p-4 bg-[#1c1c1c] rounded-lg shadow-inner">
      <input
        type="text"
        placeholder="Buscar jogo pelo nome"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={applyFilters}
        className="w-full mb-2 px-3 py-2 rounded bg-[#121212] text-white border border-greenAccent focus:outline-none focus:ring-2 focus:ring-greenAccent"
      />

      <div className="mb-2">
        <span className="text-greenAccent font-semibold mr-2">Emoções:</span>
        {emotionsList.map(({ label, value }) => (
          <label key={value} className="mr-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={selectedEmotions.includes(value)}
              onChange={() => {
                handleEmotionToggle(value);
                applyFilters();
              }}
              className="mr-1"
            />
            {label}
          </label>
        ))}
      </div>

      <div className="flex gap-4">
        <div>
          <label className="text-greenAccent font-semibold block mb-1">De:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              applyFilters();
            }}
            className="px-2 py-1 rounded bg-[#121212] text-white border border-greenAccent focus:outline-none focus:ring-2 focus:ring-greenAccent"
          />
        </div>

        <div>
          <label className="text-greenAccent font-semibold block mb-1">Até:</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              applyFilters();
            }}
            className="px-2 py-1 rounded bg-[#121212] text-white border border-greenAccent focus:outline-none focus:ring-2 focus:ring-greenAccent"
          />
        </div>
      </div>
    </div>
  );
}
