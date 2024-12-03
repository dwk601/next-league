'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

interface Match {
  id: number;
  homeTeam: { name: string };
  awayTeam: { name: string };
  date: string;
  venue: { name: string };
}

export default function UpcomingMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/matches');
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Upcoming Matches</h2>
        <div className="grid gap-4">
          {matches.map((match) => (
            <Card key={match.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{match.homeTeam.name}</span>
                  <span className="text-muted-foreground px-4">vs</span>
                  <span className="text-lg font-semibold">{match.awayTeam.name}</span>
                </div>
                <Separator className="my-4" />
                <div className="text-center text-muted-foreground">
                  {new Date(match.date).toLocaleDateString()} - {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-center text-sm text-muted-foreground mt-2">
                  {match.venue.name}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
