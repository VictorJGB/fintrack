import { cn } from "@/lib/utils"; // ou só usa className direto
import { icons as lucideIcons } from "lucide-react";
import type { ComponentType } from "react";

type Props = {
  name: string;
  className?: string;
  size?: number;
  color?: string;
};

const fallbackSvgs = (name: string, className: string, size: number, color: string) => {
  switch (name) {
    case "BankNoteArrowUp":
      return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("lucide lucide-banknote-arrow-up-icon lucide-banknote-arrow-up", className)}><path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" /><path d="M18 12h.01" /><path d="M19 22v-6" /><path d="m22 19-3-3-3 3" /><path d="M6 12h.01" /><circle cx="12" cy="12" r="2" /></svg>

    case "BankNoteArrowDown":
      return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("lucide lucide-banknote-arrow-down-icon lucide-banknote-arrow-down", className)}><path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" /><path d="m16 19 3 3 3-3" /><path d="M18 12h.01" /><path d="M19 16v6" /><path d="M6 12h.01" /><circle cx="12" cy="12" r="2" /></svg>
  }
};

export default function LucideIconStore({ name, className, size = 24, color = "currentColor" }: Props) {
  const LucideIcon = (lucideIcons as Record<string, ComponentType<{ className?: string; size?: number; color?: string }>>)[name];

  if (LucideIcon) {
    return <LucideIcon className={className} size={size} color={color} />;
  }

  const svgString = fallbackSvgs(name, className ?? '', size, color);
  if (svgString) return svgString

  // ícone não encontrado: você pode retornar um placeholder, um erro, ou nada
  return <span className="text-destructive">Ícone &quot{name}&quot não encontrado</span>;
}
