interface URLParams {
  page: string
  items_per_page?: string
  period?: string
}

interface Links {
  label: string
  href: string
  icon: string
  urlParams?: URLParams
}


export const appLinks: Links[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: 'ChartNoAxesCombined',
  },
  {
    label: 'Despesas',
    href: '/expenses',
    icon: "BankNoteArrowDown",
    urlParams: {
      page: '1',
      items_per_page: '10'
    }
  },
  {
    label: 'Despesas fixas',
    href: '/expenses/fixed',
    icon: "Pin",
    urlParams: {
      page: '1',
      items_per_page: '10'
    }
  },
  {
    label: 'Despesas planejadas',
    href: '/expenses/planned',
    icon: "NotebookPen",
    urlParams: {
      page: '1',
      items_per_page: '10'
    }
  },
  {
    label: 'Recebimentos',
    href: '/incomes',
    icon: "BankNoteArrowUp",
    urlParams: {
      page: '1',
      items_per_page: '10',
      period: 'current'
    }
  },
]
