import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function TopPlayers() {
  const players = [
    { name: "John Smith", team: "FC Thunder", goals: 15, assists: 8 },
    { name: "Mike Johnson", team: "City United", goals: 12, assists: 10 },
    { name: "David Williams", team: "Royal Eagles", goals: 11, assists: 6 },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Top Players</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {players.map((player) => (
            <Card key={player.name}>
              <CardHeader>
                <h3 className="text-xl font-bold">{player.name}</h3>
                <p className="text-muted-foreground">{player.team}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">{player.goals}</span>
                    <span className="text-muted-foreground">Goals</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">{player.assists}</span>
                    <span className="text-muted-foreground">Assists</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
