import { useState } from 'react';
import ReflectionForm from './ReflectionForm';

export default function GameDetails({
  game,
  reflections,
  onBack,
  onAddReflection,
  onDeleteReflection,
  onUpdateReflection,
}) {
  const [adding, setAdding] = useState(false);
  const [editingReflection, setEditingReflection] = useState(null);

  // Função chamada ao salvar a reflexão, adiciona ou atualiza
  const handleSave = (reflection) => {
    const reflectionWithGame = { ...reflection, game };

    if (editingReflection) {
      onUpdateReflection(reflectionWithGame);
      setEditingReflection(null);
    } else {
      onAddReflection(reflectionWithGame);
    }

    setAdding(false);
  };

  // Confirmação e deleção da reflexão
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja deletar essa reflexão?')) {
      onDeleteReflection(id);
    }
  };

  // Inicia edição da reflexão
  const handleEdit = (reflection) => {
    setEditingReflection(reflection);
    setAdding(true);
  };

  // Cancelar adição/edição
  const handleCancel = () => {
    setAdding(false);
    setEditingReflection(null);
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 text-greenAccent hover:underline focus:outline-none"
      >
        ← Voltar para lista
      </button>

      <h2 className="text-greenAccent text-3xl font-bold mb-6">{game}</h2>

      {reflections.length === 0 ? (
        <p className="text-gray-400 mb-6">Nenhuma reflexão para este jogo ainda.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {reflections.map((r) => (
            <li
              key={r.id}
              className="bg-[#1c1c1c] p-4 rounded-lg shadow-md border border-greenAccent/20 relative"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">{r.date}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(r)}
                    className="text-blue-400 hover:text-blue-600 font-semibold"
                    title="Editar reflexão"
                    aria-label="Editar reflexão"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                    title="Deletar reflexão"
                    aria-label="Deletar reflexão"
                  >
                    ✖
                  </button>
                </div>
              </div>
              <p className="text-gray-200 whitespace-pre-wrap">{r.note}</p>
              <p className="text-sm text-green-300 mt-2">{r.emotion}</p>
            </li>
          ))}
        </ul>
      )}

      {adding ? (
        <ReflectionForm
          onSave={handleSave}
          initialGame={game}
          initialData={editingReflection}
          onCancel={handleCancel}
        />
      ) : (
        <button
          onClick={() => {
            setAdding(true);
            setEditingReflection(null);
          }}
          className="bg-greenAccent text-black font-bold px-5 py-2 rounded hover:bg-green-500 transition-colors"
        >
          Adicionar Reflexão
        </button>
      )}
    </div>
  );
}
