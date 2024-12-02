export default function LeagueOverview() {
  const topTeams = [
    { name: "FC Thunder", points: 45, position: 1 },
    { name: "City United", points: 42, position: 2 },
    { name: "Royal Eagles", points: 39, position: 3 },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">League Standings</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-4">Position</th>
              <th className="text-left pb-4">Team</th>
              <th className="text-left pb-4">Points</th>
            </tr>
          </thead>
          <tbody>
            {topTeams.map((team) => (
              <tr key={team.name} className="border-b">
                <td className="py-4">{team.position}</td>
                <td className="py-4">{team.name}</td>
                <td className="py-4">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
