import Hero from '@/components/Hero'
import LeagueOverview from '@/components/LeagueOverview'
import UpcomingMatches from '@/components/UpcomingMatches'
import TopPlayers from '@/components/TopPlayers'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4">
        <LeagueOverview />
        <UpcomingMatches />
        <TopPlayers />
      </div>
    </main>
  )
}
