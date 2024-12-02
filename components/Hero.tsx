export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to NextLeague</h1>
        <p className="text-xl mb-8">
          Experience the thrill of premier soccer leagues
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
          Explore Leagues
        </button>
      </div>
    </div>
  );
}
