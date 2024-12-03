import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground py-48">
      <div className="container mx-auto px-4 text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tighter">
          Welcome to NextLeague
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Experience the thrill of premier soccer leagues
        </p>
        <Link href="/leagues">
          <Button size="lg" variant="secondary" className="mt-4">
            Explore Leagues
          </Button>
        </Link>
      </div>
    </div>
  );
}
