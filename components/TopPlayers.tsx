'use client';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface PlayerStats {
  goals: number;
  assists: number;
}

interface Player {
  id: number;
  firstName: string;
  lastName: string;
  team: {
    name: string;
  };
  stats: PlayerStats;
}

export default function TopPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopPlayers() {
      try {
        const response = await fetch('/api/players?top=3');
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching top players:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopPlayers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Top Players</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {players.map((player) => (
            <Card key={player.id}>
              <CardHeader>
                <h3 className="text-xl font-bold">{`${player.firstName} ${player.lastName}`}</h3>
                <p className="text-muted-foreground">{player.team.name}</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">{player.stats?.goals || 0}</span>
                    <span className="text-muted-foreground">Goals</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">{player.stats?.assists || 0}</span>
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
