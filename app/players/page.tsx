import PlayersTable from "./PlayersTable";

export default function PlayersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Players</h1>
      <PlayersTable />
    </div>
  );
}
