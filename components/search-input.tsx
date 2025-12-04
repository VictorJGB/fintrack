import { Input } from "./ui/input"

type Props = {
  search: string,
  onSearchChange: (value: string) => void
}

export default function SearchInput({ search, onSearchChange }: Props) {

  return (
    <Input
      className="w-full sm:max-w-sm"
      placeholder="Digite sua pesquisa..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  )
}