import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

function InfoTable() {
  const rowsCollumns = [
    'Coluna',
    'Descrição',
    'Tipo de entrada',
    'Obrigatório',
    'Exemplo'
  ]

  const rowsData = [
    {
      collumn: 'date',
      description: 'Data da despesa',
      type: 'Date',
      required: 'Sim',
      example: '23/07/2025'
    },
    {
      collumn: 'company',
      description: 'Empresa ou conta a qual a despesa foi paga',
      type: 'String',
      required: 'Sim',
      example: 'Mercado Livre, Amazon, Casa Bahia...'
    },
    {
      collumn: 'description',
      description: 'Descrição da despesa',
      type: 'String',
      required: 'Sim',
      example: 'Almoço + 2x Refrigerantes, Pizza GG, Calça jeans...'
    },
    {
      collumn: 'recipient',
      description: 'Destinatário da despesa',
      type: 'String',
      required: '-',
      example: 'Paulo, Maria, Mãe, Tio... (Por padrão, você sempre será o destinatário)'
    },
    {
      collumn: 'installments',
      description: 'Quantidade de parcelas',
      type: 'Number',
      required: 'Sim',
      example: '1, 2, 3, 4, 5, 6, 7...'
    },
    {
      collumn: 'installments_paid',
      description: 'Quantidade de parcelas pagas',
      type: 'Number',
      required: 'Sim',
      example: '1, 2, 3, 4, 5, 6, 7...'
    },
    {
      collumn: 'amount_per_installments',
      description: 'Valor de cada parcela',
      type: 'Number',
      required: 'Sim',
      example: '10, 30, 100, 2000, 24.30...'
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

export default function ImportExpenseTemplateInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className='text-primary cursor-pointer underline'>
          como preencher os campos
        </span>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[1200px]'>
        <DialogHeader>
          <DialogTitle>Preenchendo a planilha</DialogTitle>
          <DialogDescription>Entenda como preencher corretamente a planilha de despesas</DialogDescription>
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