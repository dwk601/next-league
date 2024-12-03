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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { usePlayersData } from "./usePlayersData"
import PlayersTableLoading from "./PlayersTableLoading"
import SearchBar from "./SearchBar"

type SortConfig = {
  key: string
  direction: 'asc' | 'desc'
}

export default function PlayersTable() {
  const { players, isLoading, error } = usePlayersData()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: 'asc' })
  const [sortedPlayers, setSortedPlayers] = useState(players)
  const [currentPage, setCurrentPage] = useState(1)
  const playersPerPage = 20

  useEffect(() => {
    if (players) {
      const filtered = players.filter(player => 
        `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.nationality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.position?.toLowerCase().includes(searchTerm.toLowerCase())
      )

      const sorted = [...filtered].sort((a, b) => {
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
      setCurrentPage(1) // Reset to first page when search changes
    }
  }, [players, sortConfig, searchTerm])

  const requestSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const pageCount = Math.ceil((sortedPlayers?.length || 0) / playersPerPage)
  const paginatedPlayers = sortedPlayers?.slice(
    (currentPage - 1) * playersPerPage,
    currentPage * playersPerPage
  )

  if (isLoading) return <PlayersTableLoading />
  if (error) return <div>Error: {error}</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <SearchBar 
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />
      </div>
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
            {paginatedPlayers?.map((player) => (
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
        
        {pageCount > 1 && (
          <div className="flex justify-center py-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? 'disabled' : ''}
                  />
                </PaginationItem>
                
                {[...Array(pageCount)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
                    className={currentPage === pageCount ? 'disabled' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  )
}
