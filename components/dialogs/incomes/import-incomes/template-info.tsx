import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

function InfoTable() {
  const rowsCollumns = [
    'Data',
    'Fonte',
    'Valor'
  ]

  const rowsData = [
    {
      collumn: 'date',
      description: 'Data do recebimento',
      type: 'Date',
      required: 'Sim',
      example: '23/07/2025'
    },
    {
      collumn: 'source',
      description: 'Fonte do recebimento',
      type: 'String',
      required: 'Sim',
      example: 'Prestação de serviço, 13º, Comissões...'
    },
    {
      collumn: 'amount',
      description: 'Valor do recebimento',
      type: 'Number',
      required: 'Sim',
      example: '10, 30, 20, 100...'
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {rowsCollumns.map((row, index) => (
            <TableHead key={index}>{row}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rowsData.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.collumn}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.required}</TableCell>
            <TableCell>{row.example}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function ImportIncomeTemplateInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className='text-primary cursor-pointer underline'>
          como preencher os campos
        </span>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[750px]'>
        <DialogHeader>
          <DialogTitle>Preenchendo a planilha</DialogTitle>
          <DialogDescription>Entenda como preencher corretamente a planilha de recebimentos</DialogDescription>
        </DialogHeader>


        <InfoTable />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'secondary'}>Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}