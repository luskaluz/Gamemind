import { useState, useEffect } from 'react';

export default function ReflectionForm({ onSave, initialGame, initialData = null, onCancel }) {
  const [game, setGame] = useState(initialGame || '');
  const [emotion, setEmotion] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (initialData) {
      setGame(initialData.game || initialGame || '');
      setEmotion(initialData.emotion || '');
      setNote(initialData.note || '');
    } else {
      setEmotion('');
      setNote('');
      if (!initialGame) setGame('');
    }
  }, [initialData, initialGame]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!game || !emotion || !note) return alert('Preencha todos os campos!');

    const reflection = {
      id: initialData?.id || Date.now(),
      game,
      emotion,
      note,
      date: new Date().toLocaleDateString(),
    };

    onSave(reflection);

    if (!initialData) {
      setEmotion('');
      setNote('');
      if (!initialGame) setGame('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1c1c1c] p-8 rounded-3xl shadow-lg max-w-xl mx-auto"
    >
      <h2 className="text-greenAccent text-3xl font-bold mb-6 text-center">
        {initialData
          ? `Editando reflexão para ${game}`
          : initialGame
          ? `Nova reflexão para ${initialGame}`
          : 'Nova Reflexão'}
      </h2>

      {!initialGame && (
        <input
          type="text"
          placeholder="Nome do jogo"
          value={game}
          onChange={(e) => setGame(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-[#121212] text-white placeholder-greenAccent border border-greenAccent focus:outline-none focus:ring-4 focus:ring-greenAccent transition"
          autoFocus
        />
      )}

      <select
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
        className="w-full mb-6 px-4 py-3 rounded-xl bg-[#121212] text-white placeholder-greenAccent border border-greenAccent focus:outline-none focus:ring-4 focus:ring-greenAccent transition"
      >
        <option value="" disabled>
          Escolha uma emoção
        </option>
        <option value="😄">😄 Feliz</option>
        <option value="😢">😢 Triste</option>
        <option value="😱">😱 Tenso</option>
        <option value="🤔">🤔 Reflexivo</option>
        <option value="😤">😤 Frustrado</option>
      </select>

      <textarea
        placeholder="Descreva sua experiência..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full mb-6 px-4 py-3 rounded-xl bg-[#121212] text-white placeholder-greenAccent border border-greenAccent focus:outline-none focus:ring-4 focus:ring-greenAccent transition resize-y"
        rows={5}
      />

      <div className="flex gap-6">
        <button
          type="submit"
          className="flex-1 bg-greenAccent text-black font-extrabold py-3 rounded-xl hover:bg-green-500 transition duration-300 shadow-md"
        >
          {initialData ? 'Salvar Alterações' : 'Salvar'}
        </button>

        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-700 text-white font-semibold py-3 rounded-xl hover:bg-gray-600 transition duration-300 shadow-md"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
