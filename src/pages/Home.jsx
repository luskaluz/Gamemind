import { useState, useMemo, useEffect, useRef } from 'react';
import ReflectionForm from '../components/ReflectionForm';
import GameList from '../components/GameList';
import GameDetails from '../components/GameDetails';
import Filters from '../components/Filters';
import logo from '../img/gm_logo2.svg';

export default function Home({
  reflections,
  onAddReflection,
  onUpdateReflection,
  onDeleteReflection,
  onDeleteGame,
  onImportReflections, // ← adiciona isso no App pai!
}) {
  const [selectedGame, setSelectedGame] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedEmotions: [],
    dateFrom: '',
    dateTo: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const filtersRef = useRef(null);
  const [filtersHeight, setFiltersHeight] = useState(0);

  useEffect(() => {
    if (filtersRef.current) {
      setFiltersHeight(filtersRef.current.scrollHeight);
    }
  }, [showFilters, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredReflections = useMemo(() => {
    return reflections.filter((r) => {
      if (
        filters.searchTerm &&
        !r.game.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) return false;

      if (
        filters.selectedEmotions.length > 0 &&
        !filters.selectedEmotions.includes(r.emotion)
      ) return false;

      const reflectionDateISO = new Date(
        r.date.split('/').reverse().join('-')
      )
        .toISOString()
        .slice(0, 10);

      if (filters.dateFrom && reflectionDateISO < filters.dateFrom) return false;
      if (filters.dateTo && reflectionDateISO > filters.dateTo) return false;

      return true;
    });
  }, [reflections, filters]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const exportToJsonFile = (data, filename = 'backup-reflections.json') => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!Array.isArray(imported)) throw new Error('JSON inválido');

        const valid = imported.every(
          (r) => r.id && r.game && r.text && r.date
        );
        if (!valid) throw new Error('Algumas reflexões estão mal formatadas.');

        onImportReflections(imported);
        showToast('Reflexões importadas com sucesso!');
      } catch (err) {
        alert('Erro ao importar: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleAddReflection = (newReflection) => {
    onAddReflection(newReflection);
    setSelectedGame(null);
    showToast('Reflexão salva com sucesso!');
  };

  const handleUpdateReflection = (updatedReflection) => {
    onUpdateReflection(updatedReflection);
    showToast('Reflexão atualizada com sucesso!');
  };

  const handleDeleteReflection = (id) => {
    const updated = reflections.filter((r) => r.id !== id);
    onDeleteReflection(updated);
    if (selectedGame && !updated.some((r) => r.game === selectedGame)) {
      setSelectedGame(null);
    }
    showToast('Reflexão deletada.');
  };

  const handleDeleteGame = (game) => {
    const updated = reflections.filter((r) => r.game !== game);
    onDeleteGame(updated);
    setSelectedGame(null);
    showToast(`Jogo "${game}" deletado.`);
  };

  return (
    <div className="min-h-screen px-4 py-6 max-w-3xl mx-auto">
      <h1 className="text-center">
        <img src={logo} alt="Logo" className="w-300 h-300 inline-block p-3" />
      </h1>

      {toastMessage && (
        <div className="bg-green-600 text-white px-4 py-2 rounded mb-4 text-center shadow-md transition-all">
          {toastMessage}
        </div>
      )}

      {!selectedGame ? (
        <>
          <div className="flex flex-wrap justify-between items-center mb-4 gap-4 align-center">
            <button
              onClick={() => exportToJsonFile(filteredReflections)}
              className="bg-greenAccent text-black font-bold px-4 py-2 rounded hover:bg-green-500 transition-colors"
            >
              Exportar Backup JSON
            </button>

            <label className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 cursor-pointer transition-colors">
              Importar JSON
              <input
                type="file"
                accept="application/json"
                onChange={handleImport}
                className="hidden"
              />
            </label>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              {showFilters ? 'Esconder Filtros' : 'Mostrar Filtros'}
            </button>
          </div>

          <div
            ref={filtersRef}
            style={{
              maxHeight: showFilters ? filtersHeight + 'px' : '0px',
              opacity: showFilters ? 1 : 0,
              transition: 'max-height 0.4s ease, opacity 0.3s ease',
              overflow: 'hidden',
            }}
          >
            <Filters onFilterChange={handleFilterChange} />
          </div>

          <ReflectionForm onSave={handleAddReflection} />

          <GameList
            reflections={filteredReflections}
            onSelectGame={setSelectedGame}
            onDeleteGame={handleDeleteGame}
          />
        </>
      ) : (
        <GameDetails
          game={selectedGame}
          reflections={reflections.filter((r) => r.game === selectedGame)}
          onBack={() => setSelectedGame(null)}
          onAddReflection={handleAddReflection}
          onUpdateReflection={handleUpdateReflection}
          onDeleteReflection={handleDeleteReflection}
          onDeleteGame={handleDeleteGame}
        />
      )}
    </div>
  );
}
