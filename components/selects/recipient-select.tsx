'use client'

import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent, SelectGroup } from "../ui/select";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import getRecipients from "@/actions/recipients/get-recipients";

type RecipientProps = {
  onValueChange: (value: string) => void
  defaultValue: string
  className?: string
}

export default function RecipientSelect({ onValueChange, defaultValue, className }: RecipientProps) {
  const {data, isLoading} = useQuery({
    queryKey: ["recipients"],
    queryFn: getRecipients
  })

  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className={cn("w-45", className)} disabled={isLoading}>
        <SelectValue placeholder={
          isLoading ? "Carregando..." : defaultValue ? defaultValue : "Selecione um destinatário"
        } />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data && data.length > 0 && data.map(({id, name}) => (
            <SelectItem key={id} value={name} className="capitalize">{name}</SelectItem>
          ))}

          {!data || data.length === 0 && (
            <span className="p-4 text-sm text-muted-foreground">Nenhum destinatário encontrado!</span>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}