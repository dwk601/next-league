export default function UpcomingMatches() {
  const matches = [
    {
      home: "FC Thunder",
      away: "City United",
      date: "2024-02-01",
      time: "20:00",
    },
    {
      home: "Royal Eagles",
      away: "United Stars",
      date: "2024-02-03",
      time: "18:30",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">Upcoming Matches</h2>
      <div className="grid gap-4">
        {matches.map((match) => (
          <div
            key={`${match.home}-${match.away}`}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{match.home}</span>
              <span className="text-gray-500">vs</span>
              <span className="font-semibold">{match.away}</span>
            </div>
            <div className="text-center text-gray-500 mt-2">
              {match.date} - {match.time}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
