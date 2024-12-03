import PlayersTable from "./PlayersTable";

export default function PlayersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Players</h1>
      </div>
      <PlayersTable />
    </div>
  );
}
