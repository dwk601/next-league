import { useState, useEffect } from 'react'

type PlayerStats = {
  goals: number
  assists: number
  matches: number
}

type Player = {
  id: number
  firstName: string
  lastName: string
  nationality: string | null
  position: string | null
  team: {
    name: string
  }
  stats: PlayerStats | null
}

export function usePlayersData() {
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players')
        if (!response.ok) throw new Error('Failed to fetch players')
        const data = await response.json()
        setPlayers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlayers()
  }, [])

  return { players, isLoading, error }
}
