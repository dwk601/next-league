export default function LatestNews() {
  const news = [
    {
      title: "Transfer Window Updates",
      summary: "Latest transfers and rumors from the league",
      date: "2024-01-15",
    },
    {
      title: "Player of the Month Announced",
      summary: "John Smith wins the monthly award",
      date: "2024-01-10",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">Latest News</h2>
      <div className="grid gap-6">
        {news.map((item) => (
          <div key={item.title} className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-xl mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-2">{item.summary}</p>
            <span className="text-gray-500 text-sm">{item.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
