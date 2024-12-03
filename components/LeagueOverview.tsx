"use client";

import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

type League = {
  id: number;
  name: string;
  teams: Array<{
    id: number;
    name: string;
    teamType: string;
  }>;
};

export default function LeagueOverview() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch("/api/leagues");
        if (!response.ok) throw new Error("Failed to fetch leagues");
        const data = await response.json();
        setLeagues(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load leagues");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {leagues.map((league) => (
          <div key={league.id} className="mb-8">
            <h2 className="text-3xl font-bold mb-6">{league.name}</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {league.teams?.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell className="font-medium">
                          {team.name}
                        </TableCell>
                        <TableCell>{team.teamType.toLowerCase()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
