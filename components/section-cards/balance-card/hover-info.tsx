import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { formatToBRL } from '@/utils/formatters'
import { Info } from 'lucide-react'

interface Props {
  totalExpense: number
  totalIncome: number
  totalBalance: number
  fixedIncome: number
}

export default function BalanceHoverInfo({ totalExpense, totalIncome, totalBalance, fixedIncome }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant={'ghost'} size={'icon'} className='size-8'>
          <Info />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className='flex flex-col items-start justify-center space-y-4 w-[400px] rounded-2xl'>
        <h3 className='font-semibold'>Como esse cálculo é feito?</h3>
        <p>Utilizamos a soma de
          <strong className='text-primary'> recebimentos </strong>
          e da sua <strong> renda fixa mensal </strong> e os subtraimos do total de
          <strong className='text-destructive'> suas despesas registradas </strong>
        </p>

        <div className='flex items-center justify-center'>
          {'('}<p className='text-sm'>{formatToBRL(fixedIncome)} + <strong className='text-primary'>{formatToBRL(totalIncome)}</strong></p>{')'}
          <strong className='text-sm text-destructive'>&nbsp;- {formatToBRL(totalExpense)}</strong>
          <strong className='text-sm'>&nbsp;= {formatToBRL(totalBalance)}</strong>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}