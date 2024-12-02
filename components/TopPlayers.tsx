export default function TopPlayers() {
  const players = [
    { name: "John Smith", team: "FC Thunder", goals: 15, assists: 8 },
    { name: "Mike Johnson", team: "City United", goals: 12, assists: 10 },
    { name: "David Williams", team: "Royal Eagles", goals: 11, assists: 6 },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">Top Players</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {players.map((player) => (
          <div key={player.name} className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-xl mb-2">{player.name}</h3>
            <p className="text-gray-500 mb-4">{player.team}</p>
            <div className="flex justify-between">
              <span>Goals: {player.goals}</span>
              <span>Assists: {player.assists}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
