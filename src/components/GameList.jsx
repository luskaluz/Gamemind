// src/components/GameList.jsx
export default function GameList({ reflections, onSelectGame, onDeleteGame }) {
  // Pegar nomes únicos de jogos
  const games = Array.from(new Set(reflections.map(r => r.game)));

  // Função para obter quantidade de reflexões e última data para cada jogo
  const getGameStats = (game) => {
    const gameReflections = reflections.filter(r => r.game === game);
    const count = gameReflections.length;

    // Ordenar para pegar a última data (assumindo formato DD/MM/AAAA)
    const sorted = gameReflections.sort((a, b) => {
      const [dA, mA, yA] = a.date.split('/');
      const [dB, mB, yB] = b.date.split('/');
      return new Date(yB, mB - 1, dB) - new Date(yA, mA - 1, dA);
    });
    const lastDate = sorted[0]?.date || '—';

    return { count, lastDate };
  };

  return (
    <div className="mt-6">
      <h3 className="text-greenAccent text-xl font-semibold mb-4">Seus Jogos</h3>

      {games.length === 0 ? (
        <p className="text-gray-400">Nenhum jogo cadastrado ainda.</p>
      ) : (
        <ul className="space-y-4">
          {games.map(game => {
            const { count, lastDate } = getGameStats(game);

            return (
              <li
                key={game}
                className="flex justify-between items-center bg-[#1c1c1c] p-4 rounded-lg border border-greenAccent/30 hover:bg-greenAccent/10 transition cursor-pointer"
              >
                <div
                  onClick={() => onSelectGame(game)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') onSelectGame(game);
                  }}
                  className="flex flex-col flex-grow"
                >
                  <h4 className="text-greenAccent text-lg font-semibold">{game}</h4>
                  <p className="text-gray-400 text-sm">
                    {count} {count === 1 ? 'reflexão' : 'reflexões'} • Última: {lastDate}
                  </p>

                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      window.confirm(`Tem certeza que deseja deletar o jogo "${game}" e todas suas reflexões?`)
                    ) {
                      onDeleteGame(game);
                    }
                  }}
                  className="ml-4 text-red-500 hover:text-red-700 font-bold"
                  aria-label={`Deletar jogo ${game}`}
                  title={`Deletar jogo ${game}`}
                >
                  ✖
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
