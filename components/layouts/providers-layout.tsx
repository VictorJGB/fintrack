"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { useState } from "react";
// components
import { Toaster } from "sonner";

type Props = {
	children: ReactNode;
};

export default function ProvidersLayout({ children }: Props) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<div className="size-full">
			<QueryClientProvider client={queryClient}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster richColors />
				</ThemeProvider>
			</QueryClientProvider>
		</div>
	);
}
