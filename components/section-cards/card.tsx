import Link from "next/link"

// utils
import { cn } from "@/lib/utils"
// icons
import { ExternalLink } from "lucide-react"
// components
import type { ReactNode } from "react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"


interface Props {
  title: string
  subtitle: string
  description: string
  path?: string
  variant?: 'default' | 'success' | 'destructive'
  iconButton?: ReactNode
  isSuspense?: boolean
}

const variantClassname = {
  default: {
    card: 'from-card to-background',
    title: 'text-foreground',
    subtitle: 'text-muted-foreground',
    link: 'hover:text-primary'
  },
  success: {
    card: 'from-card to-background',
    title: 'text-primary',
    subtitle: 'text-primary/70',
    link: 'hover:text-primary'
  },
  destructive: {
    card: 'from-card to-background',
    title: 'text-destructive',
    subtitle: 'text-destructive/70',
    link: 'hover:text-destructive'
  },
}

export function SectionCard({ title, subtitle, description, path, variant = 'default', iconButton: IconButton, isSuspense }: Props) {
  return (
    <Card className={cn("@container/card rounded-2xl bg-gradient-to-t", variantClassname[variant].card)}>
      <CardHeader className="relative">
        <div className="flex items-center justify-between w-full">
          <CardDescription className={variantClassname[variant].subtitle}>{subtitle}</CardDescription>
          {IconButton}
        </div>
        <CardTitle className={cn("@[250px]/card:text-3xl text-2xl font-semibold tabular-nums", variantClassname[variant].title)}>
          {isSuspense && <Skeleton className="w-24 h-8 inline-block mr-2" />}
          {!isSuspense && title}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        {path && <Link
          className={cn("line-clamp-1 flex gap-2 font-medium cursor-pointer transition-colors", variantClassname[variant].link)}
          href={path}
        >
          {description} {path && <ExternalLink className="size-4" />}
        </Link>
        }

        {!path && <p className="line-clamp-1 flex gap-2 font-medium"> {description} </p>}
      </CardFooter>
    </Card>
  )
}

export function SectionCardSkeleton() {
  return <Skeleton className="@container/card rounded-2xl h-44" />
}