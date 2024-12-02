import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Upcoming Matches</h2>
        <div className="grid gap-4">
          {matches.map((match) => (
            <Card key={`${match.home}-${match.away}`}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{match.home}</span>
                  <span className="text-muted-foreground px-4">vs</span>
                  <span className="text-lg font-semibold">{match.away}</span>
                </div>
                <Separator className="my-4" />
                <div className="text-center text-muted-foreground">
                  {match.date} - {match.time}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
