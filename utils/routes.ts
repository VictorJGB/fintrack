
interface Links {
  label: string
  href: string
  icon: string
}

export const appLinks: Links[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: 'ChartNoAxesCombined'
  },
  {
    label: 'Despesas',
    href: '/expenses',
    icon: "BankNoteArrowDown"
  },
  {
    label: 'Recebimentos',
    href: '/incomes',
    icon: "BankNoteArrowUp"
  },
]
