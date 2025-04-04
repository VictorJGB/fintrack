'use client'

import type { ReactNode } from "react"

// libs
import { queryClient } from "@/lib/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"

// components
import { Toaster } from "sonner"

type Props = {
  children: ReactNode
}

export default function ProvidersLayout({ children }: Props) {
  return (
    <div className="size-full">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute='class'
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange

        >
          {children}
          <Toaster
            richColors
          />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  )
}