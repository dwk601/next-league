'use client'

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { usePlayersData } from "./usePlayersData"
import PlayersTableLoading from "./PlayersTableLoading"

type SortConfig = {
  key: string
  direction: 'asc' | 'desc'
}

export default function PlayersTable() {
  const { players, isLoading, error } = usePlayersData()
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: 'asc' })
  const [sortedPlayers, setSortedPlayers] = useState(players)

  useEffect(() => {
    if (players) {
      const sorted = [...players].sort((a, b) => {
        if (!sortConfig.key) return 0

        let aValue = a[sortConfig.key as keyof typeof a] ?? ''
        let bValue = b[sortConfig.key as keyof typeof b] ?? ''

        if (sortConfig.key === 'goals' || sortConfig.key === 'assists') {
          aValue = a.stats?.[sortConfig.key] ?? 0
          bValue = b.stats?.[sortConfig.key] ?? 0
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
      setSortedPlayers(sorted)
    }
  }, [players, sortConfig])

  const requestSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  if (isLoading) return <PlayersTableLoading />
  if (error) return <div>Error: {error}</div>

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('firstName')}>
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('team')}>
                Team <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('position')}>
                Position <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('nationality')}>
                Nationality <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('goals')}>
                Goals <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('assists')}>
                Assists <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('matches')}>
                Matches <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers?.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{`${player.firstName} ${player.lastName}`}</TableCell>
              <TableCell>{player.team.name}</TableCell>
              <TableCell>{player.position || 'N/A'}</TableCell>
              <TableCell>{player.nationality || 'N/A'}</TableCell>
              <TableCell>{player.stats?.goals || 0}</TableCell>
              <TableCell>{player.stats?.assists || 0}</TableCell>
              <TableCell>{player.stats?.matches || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
