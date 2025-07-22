import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Info } from 'lucide-react'

type Props = {}

export default function BalanceHoverInfo({ }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant={'ghost'} size={'icon'} className='size-8'>
          <Info />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className='flex flex-col items-start justify-center space-y-4 w-80'>
        <h3 className='font-semibold'>Como esse cálculo é feito?</h3>
        <p>Utilizamos a soma de
          <strong className='text-primary'> recebimentos </strong>
          e da sua <strong> renda fixa mensal </strong> e os subtraimos do total de
          <strong className='text-destructive'> despesas registradas </strong>
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}