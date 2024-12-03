
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  searchTerm: string
  onSearch: (value: string) => void
}

export default function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search players..."
        className="max-w-sm"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}