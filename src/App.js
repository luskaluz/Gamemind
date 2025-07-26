import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  const [view, setView] = useState('home');
  const [reflections, setReflections] = useState(
    () => JSON.parse(localStorage.getItem('reflections')) || []
  );

  // Sincroniza o localStorage toda vez que reflections mudar
  useEffect(() => {
    localStorage.setItem('reflections', JSON.stringify(reflections));
  }, [reflections]);

  // Adiciona uma reflexão nova no topo da lista
  const addReflection = (newReflection) => {
    setReflections((prev) => [newReflection, ...prev]);
  };

  const deleteGame = (gameName) => {
  setReflections((prev) => prev.filter((r) => r.game !== gameName));
};

const handleImportReflections = (imported) => {
  setReflections(imported); // ou onImportReflections(imported)
};
  // Atualiza uma reflexão existente pelo id
  const updateReflection = (updatedReflection) => {
    setReflections((prev) =>
      prev.map((r) => (r.id === updatedReflection.id ? updatedReflection : r))
    );
  };

  // Deleta reflexões, aqui recebe a lista já filtrada
  const deleteReflections = (newReflections) => {
    setReflections(newReflections);
  };

  return (
    <div className="min-h-screen bg-darkBg text-white">
      <nav className="p-4 flex justify-center gap-6 border-b border-greenAccent/40 mb-6">
        <button
          className={`px-3 py-1 rounded ${
            view === 'home' ? 'bg-greenAccent text-black' : 'hover:underline'
          }`}
          onClick={() => setView('home')}
        >
          Início
        </button>
        <button
          className={`px-3 py-1 rounded ${
            view === 'profile' ? 'bg-greenAccent text-black' : 'hover:underline'
          }`}
          onClick={() => setView('profile')}
        >
          Perfil
        </button>
      </nav>

      {view === 'home' ? (
        <Home
          reflections={reflections}
          onAddReflection={addReflection}       // ajustado para onAddReflection
          onUpdateReflection={updateReflection} // passando função de update
          onDeleteReflection={deleteReflections}
          onDeleteGame={deleteGame}
          onImportReflections={handleImportReflections}
           // ajustado para onDeleteReflection
        />
      ) : (
        <Profile reflections={reflections} />
      )}
    </div>
  );
}

export default App;
