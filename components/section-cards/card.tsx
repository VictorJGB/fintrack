import { ExternalLink } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

interface Props {
  title: string
  subtitle: string
  description: string
  path?: string
  variant?: 'default' | 'success' | 'destructive'
}

export default function SectionCard({ title, subtitle, description, path, variant = 'default' }: Props) {
  return (
    <Card className="@container/card rounded-2xl bg-background">
      <CardHeader className="relative">
        <CardDescription>{subtitle}</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {title}
        </CardTitle>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {description} {path && <ExternalLink className="size-4" />}
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  )
}